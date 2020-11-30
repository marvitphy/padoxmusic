const express = require('express')
const bodyparser = require('body-parser')
const path = require('path')
const app = express()


var port = Number(process.env.PORT || 3000);

app.use(bodyparser.urlencoded({ extended: false }))
app.use(bodyparser.json())

// View Engine Setup 
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.get('/', function(req, res) {
    res.render('Dashboard')
})

app.listen(port, function(error) {
    if (error) throw error
    console.log("Server created Successfully")
})