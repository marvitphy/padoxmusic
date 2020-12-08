const knex = require('../db')


function addLink(obj) {
    return knex('links').insert(obj)
        .then(result => result)
        .catch(err => err)
}

function cadUser(nome, email, senha) {
    return knex('users').insert({ nome: nome, email: email, senha: senha })
        .then(result => result)
        .catch(err => err)
}

function getUser(email) {
    return knex('users').select().where({ email: email })
        .then(result => result)
        .catch(err => err)
}

function getLinks() {
    return knex('links').orderBy('id', 'desc')
        .then(result => result)
        .catch(err => err)
}

function delLink(id) {
    return knex('links').where({ id: id }).del()
        .then(result => result)
        .catch(err => err)

}


module.exports = {
    addLink,
    getLinks,
    delLink,
    cadUser,
    getUser
}