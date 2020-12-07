const knex = require('../db')


function addLink(obj) {
    return knex('links').insert(obj)
        .then(result => result)
        .catch(err => err)
}

function getLinks() {
    return knex('links')
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
    delLink
}