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
        });
    }
};

// SYNC GOOGLE MAPS REVIEWS
const syncGmapsReviews = async (req, res) => {
    const apiKey = process.env.GOOGLE_PLACES_API_KEY;
    const placeId = process.env.GOOGLE_PLACE_ID;

    if (!apiKey || !placeId) {
        return res.status(200).json({
            success: false,
            message: 'Google Places API Key atau Place ID belum dikonfigurasi di Environment Variables (.env).'
        });
    }

    try {
        const fetchFn = globalThis.fetch || (await import('node-fetch')).default;
        const gmapsUrl = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=reviews,rating,user_ratings_total&key=${apiKey}`;
        const response = await fetchFn(gmapsUrl);
        const data = await response.json();

        if (data.status !== 'OK' || !data.result || !data.result.reviews) {
            return res.status(400).json({
                success: false,
                message: data.error_message || 'Gagal mengambil ulasan dari Google Maps Place Details API.'
            });
        }

        const reviews = data.result.reviews.map(item => ({
            nama_klien: item.author_name || 'Klien Google Maps',
            waktu: item.relative_time_description || 'Ulasan Google Maps',
            rating: item.rating || 5,
            deskripsi: item.text || ''
        }));

        for (const review of reviews) {
            try {
                await TestimoniCRUDModels.createNewTestimoni(review);
            } catch (e) {}
        }

        return res.status(200).json({
            success: true,
            message: `Berhasil sinkronisasi ${reviews.length} ulasan terbaru dari Google Maps!`,
            data: reviews
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Terjadi kesalahan saat menghubungi Google Places API.',
            error: error.message
        });
    }
};

module.exports = {
    getTestimoni,
    getAllTestimoni,
    createNewTestimoni,
    updateTestimoni,
    deleteTestimoni,
    syncGmapsReviews
};