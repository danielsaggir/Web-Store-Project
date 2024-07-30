document.addEventListener('DOMContentLoaded', function () {
    let currentItem = null;
    let currentModel = '';

    const categoryOptions = {
        'ski-products': ['Snowboards', 'Poles', 'Boots', 'Masks'],
        'clothes': ['Shirts', 'Jackets', 'Pants', 'Socks', 'Underwear', 'Facemasks', 'Hats'],
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
        generateUploadForm(currentModel);
        const uploadModal = new bootstrap.Modal(document.getElementById('uploadModal'));
        uploadModal.show();
    });

    document.getElementById('saveUploadButton').addEventListener('click', () => {
        const newItem = generateNewItem(currentModel);

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
            fetchData(currentModel); // Refresh table with new item
            const uploadModal = bootstrap.Modal.getInstance(document.getElementById('uploadModal'));
            uploadModal.hide();
        })
        .catch(error => console.error('Error:', error));
    });

    function generateNewItem(model) {
        if (model === 'ski-products') {
            return {
                MyId: document.getElementById('uploadMyId').value,
                name: document.getElementById('uploadName').value,
                price: document.getElementById('uploadPrice').value,
                quantity: document.getElementById('uploadQuantity').value,
                description: document.getElementById('uploadDescription').value,
                category: document.getElementById('uploadCategory').value,
                color: document.getElementById('uploadColor').value,
                imageUrl: document.getElementById('uploadImgUrl').value
            };
        } else if (model === 'clothes' || model === 'accessories') {
            return {
                MyId: document.getElementById('uploadMyId').value,
                name: document.getElementById('uploadName').value,
                price: document.getElementById('uploadPrice').value,
                Large: document.getElementById('uploadLarge').value,
                Medium: document.getElementById('uploadMedium').value,
                Small: document.getElementById('uploadSmall').value,
                description: document.getElementById('uploadDescription').value,
                category: document.getElementById('uploadCategory').value,
                color: document.getElementById('uploadColor').value,
                imageUrl: document.getElementById('uploadImgUrl').value
            };
        }
    }

    function generateUploadForm(model) {
        const uploadForm = document.getElementById('uploadForm');
        uploadForm.innerHTML = '';

        const fields = [
            { label: 'ID', id: 'uploadMyId', type: 'number' },
            { label: 'Name', id: 'uploadName', type: 'text' },
            { label: 'Price', id: 'uploadPrice', type: 'number' },
            { label: 'Description', id: 'uploadDescription', type: 'textarea' },
            { label: 'Category', id: 'uploadCategory', type: 'select', options: categoryOptions[model] },
            { label: 'Color', id: 'uploadColor', type: 'select', options: ['Red', 'Blue', 'Green', 'Black', 'White', 'Yellow'] },
            { label: 'Image URL', id: 'uploadImgUrl', type: 'text' }
        ];

        if (model === 'ski-products') {
            fields.push({ label: 'Quantity', id: 'uploadQuantity', type: 'number' });
        } else if (model === 'clothes' || model === 'accessories') {
            fields.push({ label: 'Large', id: 'uploadLarge', type: 'number' });
            fields.push({ label: 'Medium', id: 'uploadMedium', type: 'number' });
            fields.push({ label: 'Small', id: 'uploadSmall', type: 'number' });
        }

        fields.forEach(field => {
            const div = document.createElement('div');
            div.className = 'mb-3';
            const label = document.createElement('label');
            label.className = 'form-label';
            label.textContent = field.label;
            div.appendChild(label);

            if (field.type === 'textarea') {
                const textarea = document.createElement('textarea');
                textarea.className = 'form-control';
                textarea.id = field.id;
                div.appendChild(textarea);
            } else if (field.type === 'select') {
                const select = document.createElement('select');
                select.className = 'form-control';
                select.id = field.id;
                field.options.forEach(option => {
                    const opt = document.createElement('option');
                    opt.value = option;
                    opt.textContent = option;
                    select.appendChild(opt);
                });
                div.appendChild(select);
            } else {
                const input = document.createElement('input');
                input.type = field.type;
                input.className = 'form-control';
                input.id = field.id;
                div.appendChild(input);
            }
            uploadForm.appendChild(div);
        });
    }

    document.getElementById('searchButton1').addEventListener('click', () => {
        const searchQuery = document.getElementById('searchBox1').value;
        console.log(`Search query: ${searchQuery}`); // Debug log
        if (searchQuery) {
            fetch(`/manager/api/search?model=${currentModel}&query=${encodeURIComponent(searchQuery)}`)
                .then(response => response.json())
                .then(data => {
                    console.log('Search result:', data); // Debug log
                    updateTable(data); // Update table with search results
                })
                .catch(error => console.error('Error:', error));
        }
    });

    document.getElementById('searchBox1').addEventListener('input', () => {
        const searchQuery = document.getElementById('searchBox1').value;
        console.log(`Search input changed: ${searchQuery}`); // Debug log
        if (!searchQuery) {
            fetchData(currentModel); // Reload all data if search box is empty
        }
    });

    function fetchData(model) {
        fetch(`/manager/api/${model}`)
            .then(response => response.json())
            .then(data => {
                console.log('Fetched data:', data); // Debug log
                updateTable(data);
            })
            .catch(error => console.error('Error:', error));
    }

    function updateTable(data) {
        const table = document.querySelector('.table-striped');
        table.innerHTML = '';

        const header = table.createTHead();
        const headerRow = header.insertRow();
        let headers = ['ID', 'Name', 'Price', 'Category', 'Color', 'Description', 'Edit', 'Delete'];

        if (currentModel === 'ski-products') {
            headers.splice(3, 0, 'Quantity');
        } else if (currentModel === 'clothes' || currentModel === 'accessories') {
            headers.splice(3, 0, 'Large', 'Medium', 'Small');
        }

        headers.forEach(headerText => {
            const th = document.createElement('th');
            th.textContent = headerText;
            headerRow.appendChild(th);
        });

        data.forEach(item => {
            console.log('Adding item to table:', item); // Debug log
            const row = table.insertRow();
            const fieldsToDisplay = ['MyId', 'name', 'price', 'category', 'color', 'description'];

            if (currentModel === 'ski-products') {
                fieldsToDisplay.splice(3, 0, 'quantity');
            } else if (currentModel === 'clothes' || currentModel === 'accessories') {
                fieldsToDisplay.splice(3, 0, 'Large', 'Medium', 'Small');
            }

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
        const editForm = document.getElementById('editForm');
        editForm.innerHTML = '';

        const fields = [
            { label: 'Name', id: 'editName', type: 'text', value: item.name },
            { label: 'Price', id: 'editPrice', type: 'number', value: item.price },
            { label: 'Description', id: 'editDescription', type: 'textarea', value: item.description },
            { label: 'Category', id: 'editCategory', type: 'select', options: categoryOptions[currentModel], value: item.category },
            { label: 'Color', id: 'editColor', type: 'select', options: ['Red', 'Blue', 'Green', 'Black', 'White', 'Yellow'], value: item.color }
        ];

        if (currentModel === 'ski-products') {
            fields.push({ label: 'Quantity', id: 'editQuantity', type: 'number', value: item.quantity });
        } else if (currentModel === 'clothes' || currentModel === 'accessories') {
            fields.push({ label: 'Large', id: 'editLarge', type: 'number', value: item.Large });
            fields.push({ label: 'Medium', id: 'editMedium', type: 'number', value: item.Medium });
            fields.push({ label: 'Small', id: 'editSmall', type: 'number', value: item.Small });
        }

        fields.forEach(field => {
            const div = document.createElement('div');
            div.className = 'mb-3';
            const label = document.createElement('label');
            label.className = 'form-label';
            label.textContent = field.label;
            div.appendChild(label);

            if (field.type === 'textarea') {
                const textarea = document.createElement('textarea');
                textarea.className = 'form-control';
                textarea.id = field.id;
                textarea.value = field.value;
                div.appendChild(textarea);
            } else if (field.type === 'select') {
                const select = document.createElement('select');
                select.className = 'form-control';
                select.id = field.id;
                field.options.forEach(option => {
                    const opt = document.createElement('option');
                    opt.value = option;
                    opt.textContent = option;
                    select.appendChild(opt);
                });
                select.value = field.value;
                div.appendChild(select);
            } else {
                const input = document.createElement('input');
                input.type = field.type;
                input.className = 'form-control';
                input.id = field.id;
                input.value = field.value;
                div.appendChild(input);
            }
            editForm.appendChild(div);
        });

        const editModal = new bootstrap.Modal(document.getElementById('editModal'));
        editModal.show();
    }

    document.getElementById('updateButton').addEventListener('click', () => {
        if (currentItem) {
            const updatedItem = {
                name: document.getElementById('editName').value,
                price: document.getElementById('editPrice').value,
                description: document.getElementById('editDescription').value,
                category: document.getElementById('editCategory').value,
                color: document.getElementById('editColor').value
            };

            if (currentModel === 'ski-products') {
                updatedItem.quantity = document.getElementById('editQuantity').value;
            } else if (currentModel === 'clothes' || currentModel === 'accessories') {
                updatedItem.Large = document.getElementById('editLarge').value;
                updatedItem.Medium = document.getElementById('editMedium').value;
                updatedItem.Small = document.getElementById('editSmall').value;
            }

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
});



    // הוספת הפונקציות לעדכון בפייסבוק
    // function postToFacebook(message) {
    //     const pageId = '334940566378514'; // העמוד שלך
    //     const accessToken = 'EAAFsNm6cRrsBO6fM9rhwimDG2vdO1FxkZCHN2E5ydqV5eNgVF16eRI4ABDfPwLYN8bAjz4FPlwL0lejXYHGZBIY9mSMaiaz3IGkH8hyG2kppD92QDyVT8AvvYR5THqAfSOmsR7sxBmFocd1aoZBlYgyXPZCBfc28gLCVE3kTsH0JDz9AZC7gDKoSx5ckZC2Wiw6ZA0UwS638DZBvs0zlMzfwql6b';

    //     console.log('Posting to Facebook:', message); // הוספת הודעת הדפסה לפני הפרסום

    //     fetch(`https://graph.facebook.com/${pageId}/feed`, {
    //         method: 'POST',
    //         body: new URLSearchParams({
    //             message: message,
    //             access_token: accessToken
    //         })
    //     })
    //     .then(response => response.json())
    //     .then(data => {
    //         if (data.error) {
    //             console.error('Error posting to Facebook:', data.error);
    //             alert(`Error posting to Facebook: ${data.error.message}`); // הוספת הודעת שגיאה למשתמש
    //         } else {
    //             console.log('Post successful:', data);
    //             alert('Post successful!'); // הוספת הודעת הצלחה למשתמש
    //         }
    //     })
    //     .catch(error => {
    //         console.error('Error:', error);
    //         alert(`Error: ${error.message}`); // הוספת הודעת שגיאה למשתמש
    //     });
    // }

    // document.getElementById('postToFacebookButton').addEventListener('click', function() {
    //     const message = document.getElementById('facebookPostMessage').value;
    //     postToFacebook(message);
    // });



document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('postToFacebookButton').addEventListener('click', function() {
        const message = document.getElementById('facebookPostMessage').value;
        postToFacebook(message);
    });

    function postToFacebook(message) {
        const accessToken = 'EAAFsNm6cRrsBO0Fa2dWAOVLZA5Op6TRNsMmreZATYXyuqZAdQf6EMov5BmKFzmvHwBs1u87TLERRxhrqjbsnjU1ZBU4J9rmuzt1AYXKiSTPiPBh354fkHfhKrGvDUg7W5q58UIEwSZCenFtYgiorkDBjE2YfmYSVWXo1f9ldQMWwdDWUhS1QW0wZBpUjg9qUQpKkqajPqH7hVH0tjJYVoTSZCSY'; // Your Page Access Token
        const page_id = '334940566378514'; 
        // const app_id = '400456016479931'; // Your Facebook App ID

        fetch(`https://graph.facebook.com/v20.0/${page_id}/feed`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                message: message,
                access_token: accessToken
                // app_id: app_id,
            })
        })
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                console.error('Error posting to Facebook:', data.error.message);
                document.getElementById('response').innerText = 'Error: ' + data.error.message;
            } else {
                document.getElementById('response').innerText = 'Post was successful!';
            }
        })
        .catch(error => {
            console.error('Error:', error);
            document.getElementById('response').innerText = 'Error: ' + error;
        });
    }
});
