const express = require('express');

const router = express.Router();

const { 
    getAllTestimoni, 
    createNewTestimoni, 
    updateTestimoni, 
    deleteTestimoni,
    syncGmapsReviews
} = require('../controller/testimoni');

router.get('/', getAllTestimoni);

router.post('/', createNewTestimoni);
router.post('/sync-gmaps', syncGmapsReviews);

router.put('/:id', updateTestimoni);

router.delete('/:id', deleteTestimoni);

module.exports = router;