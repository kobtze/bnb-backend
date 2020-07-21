const houseService = require('./house.service')
const logger = require('../../services/logger.service')

async function getHouse(req, res) {
    const house = await houseService.getById(req.params.id)
    res.send(house)
}

async function getHouses(req, res) {
    const houses = await houseService.query(req.query)
    res.json(houses)
}

async function deleteHouse(req, res) {
    await houseService.remove(req.params.id)
    res.end()
}

async function updateHouse(req, res) {
    const house = req.body;
    await houseService.update(house)
    res.send(house)
}

async function addHouse(req, res) {
    const house = req.body;
    await houseService.add(house)
    res.send(house)
}

module.exports = {
    getHouse,
    getHouses,
    deleteHouse,
    updateHouse,
    addHouse
}