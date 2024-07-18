document.addEventListener('DOMContentLoaded', function () {
    let currentItem = null;
    let currentModel = '';

    document.getElementById('ski-products-link').addEventListener('click', function () {
        currentModel = 'ski-products';
        fetchData(currentModel);
    });

    document.getElementById('clothes-link').addEventListener('click', function () {
        currentModel = 'clothes';
        fetchData(currentModel);
    });

    document.getElementById('accessories-link').addEventListener('click', function () {
        currentModel = 'accessories';
        fetchData(currentModel);
    });

    function fetchData(model) {
        fetch(`/manager/api/${model}`)
            .then(response => response.json())
            .then(data => {
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
                // Add delete functionality here
                alert(`Deleting item: ${item.name}`);
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

            console.log('Updated item:', updatedItem); // הדפסת הנתונים המעודכנים

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
                // רענון הטבלה או עדכון השורה בטבלה עם הנתונים החדשים
                fetchData(currentModel); // עדכון זה כדי לטעון מחדש את הנתונים של המודל הנוכחי
                const editModal = bootstrap.Modal.getInstance(document.getElementById('editModal'));
                editModal.hide();
            })
            .catch(error => console.error('Error:', error));
        }
    });
});
