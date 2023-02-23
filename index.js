// app packages
const express = require('express')
const app = express()

const path = require('path')
// add template engine
const hbs = require('express-handlebars');

const mysql = require('mysql')
// setup template engine directory and files extensions
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.engine('hbs', hbs.engine({
    extname: 'hbs',
    defaultLayout: 'main',
    layoutsDir: __dirname + '/views/layouts',
}))
// setup static public directory
app.use(express.static('public'));

const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({extended: true}))

const articleRoutes = require('./routes/article');

app.use('/', articleRoutes)
app.use('/article', articleRoutes)


// show articles by author
app.get('/author/:id', (req, res) => {
    let query = `SELECT * FROM article WHERE author_id ="${req.params.author_id}"`
    let articles
    con.query(query, (err, result) => {
        if (err) throw err;
        author = result
        res.render('author', {
            author: author,
            articles: articles
        })
    })
});
// app start point
app.listen(3000, () => {
    console.log("App is started at http://localhost:3000");
});