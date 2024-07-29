document.addEventListener('DOMContentLoaded', function () {
    let currentItem = null;
    let currentModel = '';

    const categoryOptions = {
        'ski-products': ['Snowboards', 'Poles', 'Boots', 'Masks'],
        'clothes': ['Jackets', 'Pants', 'Gloves'],
        'accessories': ['Helmets', 'Goggles', 'Gloves']
    };

    function updateCategoryOptions(model) {
        const uploadCategory = document.getElementById('uploadCategory');
        uploadCategory.innerHTML = '';
        categoryOptions[model].forEach(option => {
            const opt = document.createElement('option');
            opt.value = option;
            opt.textContent = option;
            uploadCategory.appendChild(opt);
        });
    }

    function showSearchAndUploadButtons() {
        document.getElementById('upload-product').style.display = 'block';
        document.getElementById('searchItem1').style.display = 'block';
    }

    document.getElementById('ski-products-link1').addEventListener('click', function () {
        currentModel = 'ski-products';
        fetchData(currentModel);
        showSearchAndUploadButtons();
        updateCategoryOptions(currentModel);
    });

    document.getElementById('clothes-link1').addEventListener('click', function () {
        currentModel = 'clothes';
        fetchData(currentModel);
        showSearchAndUploadButtons();
        updateCategoryOptions(currentModel);
    });

    document.getElementById('accessories-link1').addEventListener('click', function () {
        currentModel = 'accessories';
        fetchData(currentModel);
        showSearchAndUploadButtons();
        updateCategoryOptions(currentModel);
    });

    document.getElementById('upload-product').addEventListener('click', function () {
        const uploadModal = new bootstrap.Modal(document.getElementById('uploadModal'));
        uploadModal.show();
    });

    document.getElementById('saveUploadButton').addEventListener('click', () => {
        const newItem = {
            MyId: document.getElementById('uploadMyId').value,
            name: document.getElementById('uploadName').value,
            price: document.getElementById('uploadPrice').value,
            quantity: document.getElementById('uploadQuantity').value,
            description: document.getElementById('uploadDescription').value,
            gender: document.getElementById('uploadGender').value,
            category: document.getElementById('uploadCategory').value,
            color: document.getElementById('uploadColor').value,
            size: document.getElementById('uploadSize').value,
            imageUrl: document.getElementById('uploadImgUrl').value
        };

        fetch(`/manager/api/upload/${currentModel}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newItem)
        })
        .then(response => response.json())
        .then(data => {
            console.log('Upload successful:', data);
            fetchData(currentModel); // רענון הטבלה עם המוצר החדש
            const uploadModal = bootstrap.Modal.getInstance(document.getElementById('uploadModal'));
            uploadModal.hide();
        })
        .catch(error => console.error('Error:', error));
    });

    document.getElementById('searchButton1').addEventListener('click', () => {
        const searchQuery = document.getElementById('searchBox1').value;
        console.log(`Search query: ${searchQuery}`); // הודעת הדפסה לבדיקה
        if (searchQuery) {
            fetch(`/manager/api/search?model=${currentModel}&query=${encodeURIComponent(searchQuery)}`)
                .then(response => response.json())
                .then(data => {
                    console.log('Search result:', data); // הודעת הדפסה לבדיקה
                    updateTable(data); // עדכון הטבלה עם התוצאות של החיפוש
                })
                .catch(error => console.error('Error:', error));
        }
    });

    document.getElementById('searchBox1').addEventListener('input', () => {
        const searchQuery = document.getElementById('searchBox1').value;
        console.log(`Search input changed: ${searchQuery}`); // הודעת הדפסה לבדיקה
        if (!searchQuery) {
            fetchData(currentModel); // אם תיבת החיפוש ריקה, נטען את כל הנתונים מחדש
        }
    });

    function fetchData(model) {
        fetch(`/manager/api/${model}`)
            .then(response => response.json())
            .then(data => {
                console.log('Fetched data:', data); // הודעת הדפסה לבדיקה
                updateTable(data);
            })
            .catch(error => console.error('Error:', error));
    }

    function updateTable(data) {
        const table = document.querySelector('.table-striped');
        table.innerHTML = '';

        const header = table.createTHead();
        const headerRow = header.insertRow();
        const headers = ['ID', 'Name', 'Price', 'Quantity', 'Category', 'Color', 'Description', 'Edit', 'Delete'];

        headers.forEach(headerText => {
            const th = document.createElement('th');
            th.textContent = headerText;
            headerRow.appendChild(th);
        });

        data.forEach(item => {
            console.log('Adding item to table:', item); // הודעת הדפסה לבדיקה
            const row = table.insertRow();
            const fieldsToDisplay = ['MyId', 'name', 'price', 'quantity', 'category', 'color', 'description'];

            fieldsToDisplay.forEach(field => {
                const cell = row.insertCell();
                cell.textContent = item[field];
            });

            const editCell = row.insertCell();
            const editButton = document.createElement('i');
            editButton.classList.add('bi', 'bi-pen');
            editButton.addEventListener('click', () => {
                currentItem = item;
                openEditModal(item);
            });
            editCell.appendChild(editButton);

            const deleteCell = row.insertCell();
            const deleteButton = document.createElement('i');
            deleteButton.classList.add('bi', 'bi-trash');
            deleteButton.addEventListener('click', () => {
                if (confirm(`Are you sure you want to delete item: ${item.name}?`)) {
                    deleteItem(item.MyId);
                }
            });
            deleteCell.appendChild(deleteButton);
        });
    }

    function openEditModal(item) {
        document.getElementById('editName').value = item.name;
        document.getElementById('editPrice').value = item.price;
        document.getElementById('editQuantity').value = item.quantity;
        document.getElementById('editCategory').value = item.category;
        document.getElementById('editColor').value = item.color;
        document.getElementById('editDescription').value = item.description;

        const editModal = new bootstrap.Modal(document.getElementById('editModal'));
        editModal.show();
    }

    document.getElementById('updateButton').addEventListener('click', () => {
        if (currentItem) {
            const updatedItem = {
                name: document.getElementById('editName').value,
                price: document.getElementById('editPrice').value,
                quantity: document.getElementById('editQuantity').value,
                category: document.getElementById('editCategory').value,
                color: document.getElementById('editColor').value,
                description: document.getElementById('editDescription').value
            };

            fetch(`/manager/api/update/${currentItem.MyId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedItem)
            })
            .then(response => response.json())
            .then(data => {
                console.log('Update successful:', data);
                fetchData(currentModel);
                const editModal = bootstrap.Modal.getInstance(document.getElementById('editModal'));
                editModal.hide();
            })
            .catch(error => console.error('Error:', error));
        }
    });

    function deleteItem(itemId) {
        fetch(`/manager/api/delete/${itemId}`, {
            method: 'DELETE'
        })
        .then(response => response.json())
        .then(data => {
            console.log('Delete successful:', data);
            fetchData(currentModel);
        })
        .catch(error => console.error('Error:', error));
    }


    //facebook post
    document.getElementById('postToFacebookButton').addEventListener('click', function () {
        const message = document.getElementById('facebookPostMessage').value;
        if (message) {
            fetch('/manager/api/facebook-post', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ message })
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    alert('Post was successfully made on Facebook.');
                } else {
                    alert('Failed to post on Facebook.');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('An error occurred while posting on Facebook.');
            });
        } else {
            alert('Please write a message before posting.');
        }
    });

});
