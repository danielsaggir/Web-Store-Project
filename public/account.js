$(document).ready(function() {
    // אם יש לך אלמנטים נוספים שצריך לטעון או לעדכן, תעשה זאת כאן
    console.log('Document is ready, jQuery is working.');

    // דוגמאות לשימוש ב-jQuery
    $('.bi-trash').on('click', function() {
        alert('Clear History clicked');
        // הוסף כאן את הקוד להסרת היסטורית ההזמנות
    });

    $('.bi-pen').on('click', function() {
        alert('Bring Back to the store clicked');
        // הוסף כאן את הקוד להעברת המשתמש לחנות
    });
});
