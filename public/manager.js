document.addEventListener('DOMContentLoaded', function () {
    console.log('Fetching orders per day in July and August');
    fetch('/manager/api/orders-per-day-july-august')
      .then(response => response.json())
      .then(data => {
        console.log('Data for daily orders:', data); // הדפסת הנתונים שהתקבלו
        createBarChart('#dailyOrdersChart', data, 'Orders per Day in July and August', 'Day', 'Orders');
      })
      .catch(error => console.error('Error fetching daily orders for July and August:', error));

    console.log('Fetching orders per user');
    fetch('/manager/api/orders-per-user')
      .then(response => response.json())
      .then(data => {
        console.log('Data for orders per user:', data); // הדפסת הנתונים שהתקבלו
        createBarChart('#userOrdersChart', data, 'Orders per User', 'User', 'Orders');
      })
      .catch(error => console.error('Error fetching orders per user:', error));

    function createBarChart(container, data, title, xLabel, yLabel) {
      const margin = { top: 30, right: 30, bottom: 70, left: 60 },
        width = 600 - margin.left - margin.right,
        height = 400 - margin.top - margin.bottom;

      d3.select(container).selectAll('*').remove();

      const svg = d3.select(container)
        .append('svg')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
        .append('g')
        .attr('transform', `translate(${margin.left},${margin.top})`);

      const x = d3.scaleBand().range([0, width]).padding(0.1),
        y = d3.scaleLinear().range([height, 0]);

      x.domain(data.map(d => d._id)); // הגדרת תחום ה-X
      y.domain([0, d3.max(data, d => d.count)]); // הגדרת תחום ה-Y

      svg.append('g')
        .attr('transform', `translate(0,${height})`)
        .call(d3.axisBottom(x))
        .selectAll('text')
        .attr('transform', 'rotate(-45)')
        .style('text-anchor', 'end');

      svg.append('g')
        .call(d3.axisLeft(y).ticks(10));

      svg.append('text')
        .attr('x', width / 2)
        .attr('y', 0 - margin.top / 2)
        .attr('text-anchor', 'middle')
        .style('font-size', '16px')
        .style('text-decoration', 'underline')
        .text(title);

      svg.selectAll('.bar')
        .data(data)
        .enter().append('rect')
        .attr('class', 'bar')
        .attr('x', d => x(d._id))
        .attr('y', d => y(d.count))
        .attr('width', x.bandwidth())
        .attr('height', d => height - y(d.count))
        .attr('fill', 'rgb(128, 170, 193, 0.8)'); // צבע חדש
    }
  });
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
        if (uploadCategory) {
            uploadCategory.innerHTML = '';
            categoryOptions[model].forEach(option => {
                const opt = document.createElement('option');
                opt.value = option;
                opt.textContent = option;
                uploadCategory.appendChild(opt);
            });
        }
    }

    function showSearchAndUploadButtons() {
        const uploadProductButton = document.getElementById('upload-product');
        const searchItemButton = document.getElementById('searchItem1');
        if (uploadProductButton && searchItemButton) {
            if (currentModel === 'branches') {
                uploadProductButton.textContent = 'Add Branch';
            } else {
                uploadProductButton.textContent = 'Upload Product';
            }
            uploadProductButton.style.display = 'block';
            searchItemButton.style.display = 'block';
        }
    }

    function hideAllButtons() {
        const uploadProductButton = document.getElementById('upload-product');
        const searchItemButton = document.getElementById('searchItem1');
        if (uploadProductButton) uploadProductButton.style.display = 'none';
        if (searchItemButton) searchItemButton.style.display = 'none';
    }

    function fetchOrders() {
        fetch('/manager/api/orders')
            .then(response => response.json())
            .then(data => {
                console.log('Fetched orders:', data); // Debug log
                updateOrdersTable(data);
                hideAllButtons(); // הסתר את הכפתורים של הוספה וחיפוש
            })
            .catch(error => console.error('Error:', error));
    }

    function updateOrdersTable(data) {
        const table = document.querySelector('.table-striped');
        if (table) {
            table.innerHTML = '';

            const header = table.createTHead();
            const headerRow = header.insertRow();
            const headers = ['Username', 'Order Number', 'Total Price', 'Date', 'Products'];

            headers.forEach(headerText => {
                const th = document.createElement('th');
                th.textContent = headerText;
                headerRow.appendChild(th);
            });

            const tbody = table.createTBody();

            data.forEach(order => {
                console.log('Adding order to table:', order); // Debug log
                const row = tbody.insertRow();

                const cellUsername = row.insertCell();
                cellUsername.textContent = order.username;

                const cellOrderNumber = row.insertCell();
                cellOrderNumber.textContent = order.orderNumber;

                const cellTotalPrice = row.insertCell();
                cellTotalPrice.textContent = order.totalPrice;

                const cellDate = row.insertCell();
                cellDate.textContent = new Date(order.date).toLocaleString();

                const cellProducts = row.insertCell();
                cellProducts.innerHTML = order.products.map(product => `
                    <div>
                        <strong>${product.productName}</strong> (Price: ${product.productPrice}, Quantity: ${product.quantity}, Size: ${product.selectedSize})
                    </div>
                `).join('');
            });
        }
    }

    function fetchBranches() {
        fetch('/manager/api/branches')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok ' + response.statusText);
                }
                return response.json();
            })
            .then(data => {
                console.log('Fetched branches:', data); // Debug log
                updateBranchesTable(data);
            })
            .catch(error => console.error('Error fetching branches:', error)); // Debug log
    }

    function updateBranchesTable(data) {
        const table = document.querySelector('.table-striped');
        if (table) {
            table.innerHTML = '';

            const header = table.createTHead();
            const headerRow = header.insertRow();
            const headers = ['Name', 'City', 'Phone', 'Edit', 'Delete'];

            headers.forEach(headerText => {
                const th = document.createElement('th');
                th.textContent = headerText;
                headerRow.appendChild(th);
            });

            const tbody = table.createTBody();

            data.forEach(branch => {
                console.log('Adding branch to table:', branch); // Debug log
                const row = tbody.insertRow();

                const cellName = row.insertCell();
                cellName.textContent = branch.name;

                const cellCity = row.insertCell();
                cellCity.textContent = branch.city;

                const cellPhone = row.insertCell();
                cellPhone.textContent = branch.phone;

                const editCell = row.insertCell();
                const editButton = document.createElement('i');
                editButton.classList.add('bi', 'bi-pen');
                editButton.addEventListener('click', () => {
                    currentItem = branch;
                    openEditModal(branch);
                });
                editCell.appendChild(editButton);

                const deleteCell = row.insertCell();
                const deleteButton = document.createElement('i');
                deleteButton.classList.add('bi', 'bi-trash');
                deleteButton.addEventListener('click', () => {
                    if (confirm(`Are you sure you want to delete branch: ${branch.name}?`)) {
                        deleteItem(branch._id);
                    }
                });
                deleteCell.appendChild(deleteButton);
            });
        }
    }

    document.getElementById('branches-link1').addEventListener('click', function () {
        currentModel = 'branches';
        fetchBranches();
        showSearchAndUploadButtons();
    });

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

    document.getElementById('users-link1').addEventListener('click', function () {
        currentModel = 'users';
        fetchData(currentModel);
        hideAllButtons();
        document.getElementById('searchItem1').style.display = 'block'; // הצג רק את חיפוש
    });

    document.getElementById('orders-link1').addEventListener('click', function () {
        currentModel = 'orders';
        fetchOrders();
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
        } else if (currentModel === 'users') {
            headers = ['Username', 'First Name', 'Last Name', 'Admin', 'Edit', 'Delete'];
        } else if (currentModel === 'branches') {
            headers = ['Name', 'City', 'Phone', 'Edit', 'Delete'];
        }
    
        headers.forEach(headerText => {
            const th = document.createElement('th');
            th.textContent = headerText;
            headerRow.appendChild(th);
        });
    
        data.forEach(item => {
            console.log('Adding item to table:', item); // Debug log
            const row = table.insertRow();
            let fieldsToDisplay = ['MyId', 'name', 'price', 'category', 'color', 'description'];
    
            if (currentModel === 'ski-products') {
                fieldsToDisplay.splice(3, 0, 'quantity');
            } else if (currentModel === 'clothes' || currentModel === 'accessories') {
                fieldsToDisplay.splice(3, 0, 'Large', 'Medium', 'Small');
            } else if (currentModel === 'users') {
                fieldsToDisplay = ['username', 'firstName', 'lastName', 'isAdmin'];
            } else if (currentModel === 'branches') {
                fieldsToDisplay = ['name', 'city', 'phone'];
            }
    
            fieldsToDisplay.forEach(field => {
                const cell = row.insertCell();
                cell.textContent = item[field];
            });
    
            if (currentModel !== 'orders') {
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
                    const idField = currentModel === 'users' ? 'username' : 'MyId';
                    const idToDelete = item[idField];
                    console.log(`Attempting to delete item with ID: ${idToDelete}`); // Debug log
                    if (confirm(`Are you sure you want to delete item: ${item.name || item.username}?`)) {
                        deleteItem(idToDelete);
                    }
                });
                deleteCell.appendChild(deleteButton);
            }
        });
    }
    

    document.getElementById('upload-product').addEventListener('click', function () {
        generateUploadForm(currentModel);
        const uploadModal = new bootstrap.Modal(document.getElementById('uploadModal'));
        uploadModal.show();
    });


//     document.addEventListener('DOMContentLoaded', () => {
//     console.log('DOM fully loaded and parsed.');

//     const postToFacebookButton = document.getElementById('postToFacebookButton');
//     const facebookPostMessage = document.getElementById('facebookPostMessage');
//     const responseElement = document.getElementById('response');

//     if (postToFacebookButton && facebookPostMessage && responseElement) {
//         postToFacebookButton.addEventListener('click', handlePostToFacebook);
//     } else {
//         console.error('One or more elements are missing.');
//     }

//     function handlePostToFacebook() {
//         const boxMessage = facebookPostMessage.value.trim(); // Get the trimmed value from the textarea
        
//         if (boxMessage) {
//             console.log('Message to post:', boxMessage); // Debug log
//             postToFacebook(boxMessage); // Call the function with the message
//         } else {
//             responseElement.innerText = 'Please enter a message to post.'; // Provide feedback if the message is empty
//         }
//     }
// });

    

    // Ensure the function is defined
    function postToFacebook(message) {
    const accessToken = 'EAAOnqzR91wcBO7BaOGEE49iZBhl7uoeEcNOMPQyzY4tIZC6FhqMMl5sKEvYQLaiC8WB0kvp8W90z1a6yieDBZASwr98efZCYaPKNxfRkt5I3ZBzMMwIFAIi05dh4nBOZCmMKOYnwFtor6Dry7OSDsLiDScAOM0o4LZCjAKE5YiUweZBtj1sIM0yrcDpn5aVmbZCVb'; // Replace with your Facebook Page Access Token
    const page_id = '364520670082502'; // Replace with your Facebook Page ID

    console.log('Posting to Facebook with message:', message);

    fetch(`https://graph.facebook.com/v20.0/${page_id}/feed`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            message: message,
            access_token: accessToken
        })
    })
    .then(response => response.json())
    .then(data => {
        const responseElement = document.getElementById('response');
        console.log('Facebook response:', data);
        if (data.error) {
            console.error('Error posting to Facebook:', data.error.message);
            responseElement.innerText = 'Error: ' + data.error.message;
        } else {
            console.log('Post was successful!');
            responseElement.innerText = 'Post was successful!';
        }
    })
    .catch(error => {
        console.error('Error:', error);
        const responseElement = document.getElementById('response');
        responseElement.innerText = 'Error: ' + error;
    });
}

// Add event listener to the 'Save' button
document.getElementById('saveUploadButton').addEventListener('click', () => {
    const newItemPromise = generateNewItem(currentModel);

    newItemPromise
        .then(newItem => {
            let url;
            if (currentModel === 'branches') {
                url = `/manager/api/upload/${currentModel}`;
            } else {
                url = `/manager/api/upload-product/${currentModel}`;
            }
            console.log(`URL is: ${url}`);
            return fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newItem)
            });
        })
        .then(response => response.json())
        .then(data => {
            console.log('Upload successful:', data);
            fetchData(currentModel); // Refresh table with new item
            const uploadModal = bootstrap.Modal.getInstance(document.getElementById('uploadModal'));
            uploadModal.hide();

            if (currentModel !== 'branches') {
                // Extracting product information
                const productName = data.name; // Adjust according to the actual response structure
                const productPrice = data.price; // Adjust according to the actual response structure
                const productImage = data.imageUrl;
                
                console.log(`Product Name: ${productName}, Product Price: ${productPrice}, Product Image: ${productImage}`);
                const message = `Cheers to our new product !\n ${productName}\n Only ${productPrice} for a limited time!\n Check it out: ${productImage}`;

                // Posting to Facebook
                postToFacebook(message)
            }
        })
        .catch(error => console.error('Error:', error));
});

    

    function generateNewItem(model) {
        if (model === 'branches') {
            const branch = {
                name: document.getElementById('uploadName').value,
                city: document.getElementById('uploadCity').value,
                phone: document.getElementById('uploadPhone').value
            };
    
            // Request to Google Maps API to get city coordinates
            return fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${branch.city}&key=AIzaSyB6RNA9mZmst46xbC-wuiIEA7xIQAjO-Pw`)
                .then(response => response.json())
                .then(data => {
                    console.log(`data is: ${JSON.stringify(data)}`)
                    if (data.results.length > 0) {
                        const location = data.results[0].geometry.location;
                        branch.lat = location.lat;
                        branch.lng = location.lng;
                    } else {
                        throw new Error('City not found in Google Maps');
                    }
                    return branch;
                })
                .catch(error => {
                    console.error('Error fetching coordinates:', error);
                    throw error;
                });
        } else {
            let newItem;
            if (model === 'ski-products') {
                newItem = {
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
                newItem = {
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
            return Promise.resolve(newItem);
        }
    }
    
    

    function generateUploadForm(model) {
        const uploadForm = document.getElementById('uploadForm');
        uploadForm.innerHTML = '';
    
        let fields;
        if (model === 'branches') {
            fields = [
                { label: 'Name', id: 'uploadName', type: 'text', value: '' },
                { label: 'City', id: 'uploadCity', type: 'text' },
                { label: 'Phone', id: 'uploadPhone', type: 'text' }
            ];
        } else {
            fields = [
                { label: 'ID', id: 'uploadMyId', type: 'number' },
                { label: 'Name', id: 'uploadName', type: 'text', value: '' },
                { label: 'Price', id: 'uploadPrice', type: 'number' },
                { label: 'Description', id: 'uploadDescription', type: 'textarea' },
                { label: 'Category', id: 'uploadCategory', type: 'select', options: categoryOptions[model] },
                { label: 'Color', id: 'uploadColor', type: 'select', options: ['Red', 'Blue', 'Green', 'Black', 'White', 'Yellow'] },
                { label: 'Image URL', id: 'uploadImgUrl', type: 'text', value: '' }
            ];
    
            if (model === 'ski-products') {
                fields.push({ label: 'Quantity', id: 'uploadQuantity', type: 'number' });
            } else if (model === 'clothes' || model === 'accessories') {
                fields.push({ label: 'Large', id: 'uploadLarge', type: 'number' });
                fields.push({ label: 'Medium', id: 'uploadMedium', type: 'number' });
                fields.push({ label: 'Small', id: 'uploadSmall', type: 'number' });
            }
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
            uploadForm.appendChild(div);
        });
    }
    

    function openEditModal(item) {
        const editForm = document.getElementById('editForm');
        editForm.innerHTML = '';
    
        let fields;
        if (currentModel === 'users') {
            fields = [
                { label: 'Username', id: 'editUsername', type: 'text', value: item.username, readonly: true },
                { label: 'First Name', id: 'editFirstName', type: 'text', value: item.firstName, readonly: true },
                { label: 'Last Name', id: 'editLastName', type: 'text', value: item.lastName, readonly: true },
                { label: 'Admin', id: 'editIsAdmin', type: 'checkbox', value: item.isAdmin }
            ];
        } else if (currentModel === 'branches') {
            fields = [
                { label: 'Name', id: 'editName', type: 'text', value: item.name, readonly: true },
                { label: 'City', id: 'editCity', type: 'text', value: item.city, readonly: true },
                { label: 'Phone', id: 'editPhone', type: 'text', value: item.phone }
            ];
        } else {
            fields = [
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
                textarea.readOnly = field.readonly || false;
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
                select.disabled = field.readonly || false;
                div.appendChild(select);
            } else if (field.type === 'checkbox') {
                const input = document.createElement('input');
                input.type = 'checkbox';
                input.className = 'form-check-input';
                input.id = field.id;
                input.checked = field.value;
                input.readOnly = field.readonly || false;
                const divCheckbox = document.createElement('div');
                divCheckbox.className = 'form-check';
                divCheckbox.appendChild(input);
                const labelCheckbox = document.createElement('label');
                labelCheckbox.className = 'form-check-label';
                labelCheckbox.setAttribute('for', field.id);
                labelCheckbox.textContent = 'Admin';
                divCheckbox.appendChild(labelCheckbox);
                div.appendChild(divCheckbox);
            } else {
                const input = document.createElement('input');
                input.type = field.type;
                input.className = 'form-control';
                input.id = field.id;
                input.value = field.value;
                input.readOnly = field.readonly || false;
                div.appendChild(input);
            }
            editForm.appendChild(div);
        });
    
        const editModal = new bootstrap.Modal(document.getElementById('editModal'));
        editModal.show();
    }

    document.getElementById('updateButton').addEventListener('click', () => {
        if (currentItem) {
            let updatedItem;
            if (currentModel === 'users') {
                updatedItem = {
                    username: document.getElementById('editUsername').value,
                    firstName: document.getElementById('editFirstName').value,
                    lastName: document.getElementById('editLastName').value,
                    isAdmin: document.getElementById('editIsAdmin').checked
                };
            } else if (currentModel === 'branches') {
                updatedItem = {
                    phone: document.getElementById('editPhone').value
                };
            } else {
                updatedItem = {
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
            }

            const updateUrl = currentModel === 'users'
                ? `/manager/api/update-user/${currentItem.username}`
                : currentModel === 'branches'
                ? `/manager/api/update-branch/${currentItem._id}`
                : `/manager/api/update/${currentItem.MyId}`;
            fetch(updateUrl, {
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
    // Ensure itemId is a string for URL
    const deleteUrl = currentModel === 'users'
        ? `/manager/api/delete-user/${itemId}`
        : currentModel === 'branches'
        ? `/manager/api/delete-branch/${itemId}`
        : `/manager/api/delete/${itemId}`;

    fetch(deleteUrl, {
        method: 'DELETE'
    })
    .then(response => response.json())
    .then(data => {
        console.log('Delete successful:', data);
        fetchData(currentModel);
    })
    .catch(error => console.error('Error:', error));
}
})
