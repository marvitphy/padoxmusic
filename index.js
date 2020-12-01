const express = require('express')
const bodyparser = require('body-parser')
const path = require('path')
const app = express()


var port = Number(process.env.PORT || 4000);

app.use(bodyparser.urlencoded({ extended: false }))
app.use(bodyparser.json())

// View Engine Setup 
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
app.use(express.static('public'))

app.get('/', function(req, res) {
    res.render('Dashboard')
})
app.get('/api/addGig', function(req, res) {
    res.send('Error')
})

app.listen(port, function(error) {
    if (error) throw error
    console.log("Server created Successfully")
})