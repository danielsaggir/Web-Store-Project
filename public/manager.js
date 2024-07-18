// document.addEventListener('DOMContentLoaded', function() {
//     document.getElementById('ski-products-link').addEventListener('click', function() {
//         fetchData('ski-products');
//     });

//     document.getElementById('clothes-link').addEventListener('click', function() {
//         fetchData('clothes');
//     });

//     document.getElementById('accessories-link').addEventListener('click', function() {
//         fetchData('accessories');
//     });

//     // document.getElementById('users-link').addEventListener('click', function() {
//     //     fetchData('users');
//     // });

//     function fetchData(model) {
//         fetch(`/manager/api/${model}`)
//             .then(response => response.json()) // קבלת התגובה והמרתה ל-JSON
//             .then(data => {
//                 updateTable(data);
//             })
//             .catch(error => console.error('Error:', error));
//     }

//     function updateTable(data) {
//         const table = document.querySelector('.table-striped');
//         table.innerHTML = ''; // ניקוי תוכן הטבלה הקיים

//         // Assuming data is an array of objects
//         data.forEach(item => {
//             const row = table.insertRow();
//             for (const key in item) {
//                 const cell = row.insertCell();
//                 cell.textContent = item[key];
//             }
//         });
//     }
// });


document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('ski-products-link').addEventListener('click', function () {
        fetchData('ski-products');
    });

    document.getElementById('clothes-link').addEventListener('click', function () {
        fetchData('clothes');
    });

    document.getElementById('accessories-link').addEventListener('click', function () {
        fetchData('accessories');
    });

    // document.getElementById('users-link').addEventListener('click', function() {
    //     fetchData('users');
    // });

    function fetchData(model) {
        fetch(`/manager/api/${model}`)
            .then(response => response.json()) // קבלת התגובה והמרתה ל-JSON
            .then(data => {
                updateTable(data);
            })
            .catch(error => console.error('Error:', error));
    }

    function updateTable(data) {
        const table = document.querySelector('.table-striped');
        table.innerHTML = ''; // ניקוי תוכן הטבלה הקיים

        // Create table headers
        const header = table.createTHead();
        const headerRow = header.insertRow();
        const headers = ['ID', 'Name', 'Price', 'Quantity', 'Category', 'Color', 'Description', 'Edit', 'Delete']; // Headers to display

        headers.forEach(headerText => {
            const th = document.createElement('th');
            th.textContent = headerText;
            headerRow.appendChild(th);
        });

        // Fill table rows with specific fields
        data.forEach(item => {
            const row = table.insertRow();

            // Fields to display
            const fieldsToDisplay = ['MyId', 'name', 'price', 'quantity', 'category', 'color', 'description'];

            fieldsToDisplay.forEach(field => {
                const cell = row.insertCell();
                cell.textContent = item[field];
            });

            // Add edit button
            const editCell = row.insertCell();
            const editButton = document.createElement('i');
            editButton.classList.add('bi', 'bi-pen');
            editButton.addEventListener('click', () => {
                // Add edit functionality here
                alert(`Editing item: ${item.name}`);
            });
            editCell.appendChild(editButton);

            // Add delete button
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
});
