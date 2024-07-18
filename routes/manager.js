// const express = require('express');
// const router = express.Router();
// const path = require('path');

// // Route for manager page
// router.get('/manager', (req, res) => {
//     res.render('manager');
// });

// module.exports = router;

const express = require('express');
const router = express.Router();
const managerController = require('../controllers/managerController');

// נתיב להצגת דף הניהול
router.get('/manager', (req, res) => {
    res.render('manager');
});

// נתיבים לקבלת הנתונים מה-DB
router.get('/manager/api/ski-products', managerController.getSkiProducts);
router.get('/manager/api/clothes', managerController.getClothes);
router.get('/manager/api/accessories', managerController.getAccessories);
// router.get('/manager/api/users', managerController.getUsers);

//updating the product
router.put('/manager/api/update/:id', managerController.updateProduct);

//delete product
router.delete('/manager/api/delete/:id', managerController.deleteProduct);

//upload product
router.post('/manager/api/upload/:model', managerController.uploadProduct);

module.exports = router;

