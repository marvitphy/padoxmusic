const express = require('express')
const bodyparser = require('body-parser')
const path = require('path')
const app = express()
const sharp = require('sharp');
const linksModel = require('./models/linksModel')



var port = Number(process.env.PORT || 5000);

app.use(bodyparser.urlencoded({ extended: false }))
app.use(bodyparser.json())

// View Engine Setup 
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
app.use(express.static('public'))

app.get('/', function(req, res) {
    res.render('Dashboard')
})

app.get('/api/getLinks', async(req, res, next) => {
    let result = await linksModel.getLinks();
    res.json(result)
});

app.post('/api/addLink', async(req, res, next) => {
    let obj = req.query
    let result = await linksModel.addLink(obj);
    res.json(result)
})

app.post('/api/deleteLink', async(req, res, next) => {

    let id = req.query.id
    let result = await linksModel.delLink(id);
    res.json(result)

})

app.listen(port, function(error) {
    if (error) throw error
    console.log("Server created Successfully")
})