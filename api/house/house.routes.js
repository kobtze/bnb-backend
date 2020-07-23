const express = require('express')
    // const { requireAuth, requireAdmin } = require('../../middlewares/requireAuth.middleware')
const { getHouse, getHouses, deleteHouse, updateHouse, addHouse } = require('./house.controller')
const router = express.Router()
module.exports = router

// middleware that is specific to this router
// router.use(requireAuth)

router.get('/', getHouses)
router.get('/:id', getHouse)
router.put('/:id', updateHouse)
    // router.post('/', requireAdmin, addHouse)
    // router.delete('/:id', requireAdmin, deleteHouse)
router.delete('/:id', deleteHouse)
    // router.put('/:id',  requireAuth, updateUser)
    // router.delete('/:id',  requireAuth, requireAdmin, deleteUser)