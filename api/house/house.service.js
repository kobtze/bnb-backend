const dbService = require('../../services/db.service')
    // const reviewService = require('../review/review.service')
const ObjectId = require('mongodb').ObjectId

module.exports = {
    query,
    getById,
    // getByEmail,
    remove,
    update,
    add
}

async function query(filterBy = {}) {
    console.log('HOUSE.SERVICE BACKEND', filterBy);
    const criteria = _buildCriteria(filterBy)
        // var prop = (filterBy.sort === 'price') ? 'price' : 'name';
        // var order = (filterBy.order === 'desc') ? -1 : 1;
        // var sortBy = {
        //     [prop]: order
        // }
    const collection = await dbService.getCollection('house')

    try {
        // const houses = await collection.find().toArray();
        // const houses = await collection.find(criteria).sort(sortBy).toArray();

        const houses = await collection.find(criteria).toArray();
        console.log(houses);
        return houses
    } catch (err) {
        console.log('ERROR: cannot find houses')
        throw err;
    }
}

async function getById(houseId) {
    const collection = await dbService.getCollection('house')
    try {
        const house = await collection.findOne({ "_id": ObjectId(houseId) })
            // delete user.password

        // user.givenReviews = await reviewService.query({byUserId: ObjectId(user._id) })
        // user.givenReviews = user.givenReviews.map(review => {
        //     delete review.byUser
        //     return review
        // })


        return house
    } catch (err) {
        // console.log(`ERROR: while finding house ${houseId}`)
        throw err;
    }
}
// async function getByEmail(email) {
//     const collection = await dbService.getCollection('user')
//     try {
//         const user = await collection.findOne({email})
//         return user
//     } catch (err) {
//         console.log(`ERROR: while finding user ${email}`)
//         throw err;
//     }
// }

async function remove(houseId) {
    const collection = await dbService.getCollection('house')
    try {
        await collection.deleteOne({ "_id": ObjectId(houseId) })
    } catch (err) {
        // console.log(`ERROR: cannot remove house: ${houseId}`)
        throw err;
    }
}

async function update(house) {
    const collection = await dbService.getCollection('house')
    house._id = ObjectId(house._id);

    try {
        await collection.replaceOne({ "_id": house._id }, { $set: house })
        return house
    } catch (err) {
        // console.log(`ERROR: cannot update house ${house._id}`)
        throw err;
    }
}

async function add(house) {
    const collection = await dbService.getCollection('house')
    try {
        await collection.insertOne(house);
        return house;
    } catch (err) {
        //   console.log(`ERROR: cannot insert house`)
        throw err;
    }
}

// function _buildCriteria(filterBy) {
//     const criteria = {};


//     if (filterBy.name) {
//         var filterName = new RegExp(filterBy.name, 'i');
//         criteria.name = { $regex: filterName }
//     }
//     // if (filterBy.name) criteria.name = {'$regex': `.*${filterBy.name}.*\i`}
//     if (filterBy.type !== 'all') criteria.type = filterBy.type
//     if (filterBy.inStock !== 'all') {
//         criteria.inStock = (filterBy.inStock === 'inStock') ? true : false
//     }
//     return criteria;
// }
function _buildCriteria(filterBy) {
    const criteria = {}

    console.log('filterBy', filterBy)
    if (filterBy.location) criteria.location = { $regex: new RegExp(filterBy.location, 'i') };
    // if (filterBy.adultNumber) criteria.capacity += filterBy.adultNumber
    console.log('house.service criteria:', criteria)
    return criteria;
}