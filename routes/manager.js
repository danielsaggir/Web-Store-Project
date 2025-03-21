
const express = require('express');
const router = express.Router();
const managerController = require('../controllers/managerController');

// נתיב להצגת דף הניהול
router.get('/manager', managerController.getManagerPage);
// router.get('/manager', (req, res) => {
//     res.render('manager');
// });

// נתיבים לקבלת הנתונים מה-DB
router.get('/manager/api/ski-products', managerController.getSkiProducts);
router.get('/manager/api/clothes', managerController.getClothes);
router.get('/manager/api/accessories', managerController.getAccessories);
router.get('/manager/api/users', managerController.getUsers);

//updating the product
router.put('/manager/api/update/:id', managerController.updateProduct);

//delete product
router.delete('/manager/api/delete/:id', managerController.deleteProduct);

//add product
router.post('/manager/api/upload-product/:model', managerController.uploadProduct);

// search product
router.get('/manager/api/search', managerController.searchProduct);

// search by username
router.get('/manager/api/search-user', managerController.searchUser);

// search by city (branch)
router.get('/manager/api/search-branch', managerController.searchBranch);

// update user
router.put('/manager/api/update-user/:username', managerController.updateUser);

// delete user
router.delete('/manager/api/delete-user/:username', managerController.deleteUser);

//get orders
router.get('/manager/api/orders', managerController.getOrders);

router.get('/manager/api/branches', managerController.getBranches);
router.put('/manager/api/update-branch/:id', managerController.updateBranch);
router.delete('/manager/api/delete-branch/:id', managerController.deleteBranch);
router.post('/manager/api/upload/branches', managerController.uploadBranch);

router.get('/manager/api/orders-per-day-july-august', managerController.getOrdersPerDayJulyAugust);
router.get('/manager/api/orders-per-user', managerController.getOrdersPerUser);

module.exports = router;


