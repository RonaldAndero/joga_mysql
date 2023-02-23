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
    let query = `SELECT article.id, article.name, article.slug, article.image, article.body, article.published, author.name AS author, author.id AS author_id FROM article JOIN author ON article.author_id = author.id WHERE slug = "${req.params.slug}";`
    let article
    con.query(query, (err, result) => {
        if (err) throw err
        article = result
        res.render('article', {
            article: article
        })
    })
}

const getArticlesByAuthor = (req, res) => {
    let query = `SELECT article.id, article.name, article.slug, article.image, article.body, article.published, author.name AS author, author.id AS author_id FROM article JOIN author ON article.author_id = author.id WHERE author_id = "${req.params.author_id}";`
    let articles = []
    let author
    con.query(query, (err, result) => {
        if (err) throw err
        articles = result
        author = result[0]
        res.render('author', {
            articles: articles,
            author: author
        })
    })
}

module.exports = {
    getAllArticles,
    getArticleBySlug,
    getArticlesByAuthor
}