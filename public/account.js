$(document).ready(function() {
    console.log("Document is ready");

    $('#container').on('click', '#delete-order', function() {
        const orderId = $(this).data('order-id');
        const confirmation = confirm('Are you sure you want to bring this order back to the store?');

        if (confirmation) {
            $.ajax({
                url: `/delete/${orderId}`,
                type: 'DELETE',
                success: function(response) {
                    alert('Order successfully deleted and product quantity updated.');
                    location.reload(); // רענן את הדף כדי להראות את השינויים
                },
                error: function(xhr, status, error) {
                    alert('Error deleting order: ' + xhr.responseText);
                }
            });
        }
    });

    const searchOrders = () => {
        const searchTerm = $('#orderSearchBox').val().toLowerCase();
        console.log("Search Term:", searchTerm); // הוספת לוג

        $('.card.text-center.mx-auto').each(function() {
            const orderCard = $(this);
            let showOrder = false;

            orderCard.find('.order-info .card-text').each(function() {
                const productName = $(this).text().toLowerCase();
                console.log("Product Name:", productName); // הוספת לוג

                if (productName.includes(searchTerm)) {
                    showOrder = true;
                }
            });

            if (showOrder) {
                orderCard.show();
                console.log("Showing order card"); // הוספת לוג
            } else {
                orderCard.hide();
                console.log("Hiding order card"); // הוספת לוג
            }
        });
    };

    $('#orderSearchButton').on('click', function() {
        console.log("Search button clicked"); // הוספת לוג
        searchOrders();
    });

    $('#orderSearchBox').on('keyup', function() {
        console.log("Keyup event on search box"); // הוספת לוג
        searchOrders();
    });
});
