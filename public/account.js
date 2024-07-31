$(document).ready(function() {
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
// });

const searchOrders = () => {
    const searchTerm = $('#orderSearchBox').val().toLowerCase();
    console.log("Search Term:", searchTerm); // הוספת לוג
    $('.card.text-center.mx-auto').each(function() {
        const orderCard = $(this);
        let showOrder = false;
        orderCard.find('.order-details .card-text').each(function() {
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

$('#orderSearchButton').on('click', searchOrders);
});
// $(document).ready(function() {
//     // אם יש לך אלמנטים נוספים שצריך לטעון או לעדכן, תעשה זאת כאן
//     console.log('Document is ready, jQuery is working.');

//     // דוגמאות לשימוש ב-jQuery
//     $('.bi-trash').on('click', function() {
//         alert('Clear History clicked');
//         // הוסף כאן את הקוד להסרת היסטורית ההזמנות
//     });

//     $('.bi-pen').on('click', function() {
//         alert('Bring Back to the store clicked');
//         // הוסף כאן את הקוד להעברת המשתמש לחנות
//     });
// });
