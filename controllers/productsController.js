exports.getProducts = (req, res) => {
    const category = req.query.category;
    res.render('products', { category });
};