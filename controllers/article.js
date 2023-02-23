const con = require('../utils/db')

// show all articles - index page
const getAllArticles = (req, res) => {
    let query = "SELECT * FROM article";
    let articles = []
    con.query(query, (err, result) => {
        if (err) throw err;
        articles = result
        res.render('index', {
            articles: articles
        })
    })
};
//show article by this slug
const getArticleBySlug = (req, res) => {
    let query = `SELECT article.*, author.name AS authorName FROM article INNER JOIN author ON article.author_id = author.id WHERE slug="${req.params.slug}"`
    let article
    con.query(query, (err, result) => {
        if (err) throw err;
        console.log(result)
        article = result;
        res.render('article', {
            article: article
        })
    });
};

module.exports = {
    getAllArticles,
    getArticleBySlug
}