const express = require('express')
const bodyparser = require('body-parser')
const path = require('path')
const app = express()
const sharp = require('sharp');
const linksModel = require('./models/linksModel')
const bcrypt = require('bcrypt');

var port = Number(process.env.PORT || 5000);

app.use(bodyparser.urlencoded({ extended: false }))
app.use(bodyparser.json())

// View Engine Setup 
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
app.use(express.static('public'))

app.get('/', function(req, res) {
    res.render('Dash')
})
app.get('/links', function(req, res) {
    res.render('ViewLinks')
})

// sharp('./public/assets/fotofoto.jpg')
//     .resize(1116, 774)
//     .toFile('5.jpg', (err, info) => {});


app.get('/api/getLinks', async(req, res, next) => {
    let result = await linksModel.getLinks();
    res.json(result)
});


app.get('/masterLinks', async(req, res, next) => {
    res.render('Links')
});
app.get('/login', async(req, res, next) => {
    res.render('Login')
});

app.post('/api/addLink', async(req, res, next) => {
    let obj = req.body
    let result = await linksModel.addLink(obj);
    res.json(result)
})

app.post('/api/cadastrarUser', async(req, res, next) => {

    let nome = req.query.nome
    let email = req.query.email
    let senha = req.query.senha
    let getUser = await linksModel.getUser(email);
    if (getUser.length <= 0) {
        await bcrypt.hash(senha, 10, function(err, hash) {
            let result = linksModel.cadUser(nome, email, hash);
            res.json({ msg: 'Usuário cadastrado com sucesso!' });
        });
    } else {
        res.json({ msg: 'Usuário(a) já cadastrado(a).' })
    }

});

app.post('/api/deleteLink', async(req, res, next) => {

    let id = req.body.id
    let result = await linksModel.delLink(id);
    res.json(result)

})
app.post('/api/getUser', async(req, res, next) => {

    let email = req.body.email
    let senha = req.body.senha
    let dados = await linksModel.getUser(email);
    if (dados == [] || dados == undefined || dados == 0 || dados == null) {
        res.json({ status: 3, msg: 'Usuário não cadastrado.' })
    } else {
        for (i in dados) {
            bcrypt.compare(senha, dados[i].senha, function(err, result) {
                if (result == true) {
                    res.json({ status: 1 })
                } else {
                    res.json({ status: 0, msg: 'Senha incorreta.' })
                }
            });
        }
    }


})

app.listen(port, function(error) {
    if (error) throw error
    console.log("Server created Successfully")
})