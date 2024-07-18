document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('ski-products-link').addEventListener('click', function() {
        fetchData('ski-products');
    });

    document.getElementById('clothes-link').addEventListener('click', function() {
        fetchData('clothes');
    });

    document.getElementById('accessories-link').addEventListener('click', function() {
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

        // Assuming data is an array of objects
        data.forEach(item => {
            const row = table.insertRow();
            for (const key in item) {
                const cell = row.insertCell();
                cell.textContent = item[key];
            }
        });
    }
});
