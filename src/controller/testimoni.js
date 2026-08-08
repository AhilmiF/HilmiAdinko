const TestimoniModels = require('../models/testimoni');
const TestimoniCRUDModels = require('../models/testimoniModel');

// READ (GET) legacy - untuk route /testimoni
const getTestimoni = async (req, res) => {
    try {
        const [data] = await TestimoniModels.getTestimoni();
        res.json({
            message: 'Testimoni data has been retrieved',
            data: data
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error retrieving testimoni data',
            serverMessage: error
        });
    }
};

// READ (GET) - untuk route /testimoniRoute
const getAllTestimoni = async (req, res) => {
    try {
        const [data] = await TestimoniCRUDModels.getAllTestimoni();
        res.status(200).json({
            message: 'Get all testimoni success',
            data: data
        });
    } catch (error) {
        res.status(500).json({
            message: 'Server Error',
            serverMessage: error
        });
    }
};

// CREATE (POST)
const createNewTestimoni = async (req, res) => {
    const { body } = req;
    try {
        await TestimoniCRUDModels.createNewTestimoni(body);
        res.status(201).json({
            message: 'Create new testimoni success',
            data: body
        });
    } catch (error) {
        res.status(500).json({
            message: 'Server Error',
            serverMessage: error
        });
    }
};

// UPDATE (PUT)
const updateTestimoni = async (req, res) => {
    const { id } = req.params;
    const { body } = req;
    try {
        await TestimoniCRUDModels.updateTestimoni(body, id);
        res.status(200).json({
            message: 'Update testimoni success',
            data: {
                id: id,
                ...body
            }
        });
    } catch (error) {
        res.status(500).json({
            message: 'Server Error',
            serverMessage: error
        });
    }
};

// DELETE (DELETE)
const deleteTestimoni = async (req, res) => {
    const { id } = req.params;
    try {
        await TestimoniCRUDModels.deleteTestimoni(id);
        res.status(200).json({
            message: 'Delete testimoni success',
            data: null
        });
    } catch (error) {
        res.status(500).json({
            message: 'Server Error',
            serverMessage: error
        });
    }
};

module.exports = {
    getTestimoni,
    getAllTestimoni,
    createNewTestimoni,
    updateTestimoni,
    deleteTestimoni
};