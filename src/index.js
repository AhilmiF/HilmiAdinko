require('dotenv').config();
const PORT = process.env.PORT || 4000;
const express = require('express');

const upload = require('./middleware/multer');
const middlewareLogRequest = require('./middleware/logs');


const homeRoutes = require('./routes/home');
const aboutRoutes = require('./routes/about');
const layananRoutes = require('./routes/layanan');
const portofolioRoutes = require('./routes/portofolio');
const testimoniRoutes = require('./routes/testimoni');
const kontakRoutes = require('./routes/kontak');

// Additional routes for portfolio, contact, kategori if needed
const portfolioRoute = require('./routes/portfolioRoute');
const contactRoute = require('./routes/contactRoute');
const kategoriRoute = require('./routes/kategoriRoute');
const testimoniRoute = require('./routes/testimoniRoute');


const app = express();

// Middleware log request
app.use(middlewareLogRequest);

// Middleware public folder
app.use('/assets', express.static('public/images'));

// Middleware body parser JSON
app.use(express.json());

// Routing

app.use('/home', homeRoutes);
app.use('/about', aboutRoutes);
app.use('/layanan', layananRoutes);
app.use('/portofolio', portofolioRoutes);
app.use('/portfolio', portfolioRoute);
app.use('/testimoni', testimoniRoutes);
app.use('/kontak', kontakRoutes);
app.use('/contact', contactRoute);
app.use('/kategori', kategoriRoute);
app.use('/testimoniRoute', testimoniRoute);


// Routing upload file
app.post('/upload', upload.single('pictures'), (req, res) => {
    res.status(201).json({
        message: 'File has been uploaded'
    });
});

// Routing root
app.use("/", (req, res, next) => {
    if (req.path !== '/') return next();
    res.json({
        message: 'Home page by Hilmi'
    });
});

// Error handling
app.use((err, req, res, next) => {
    res.status(500).json({
        message: err.message
    });
});

app.listen(PORT, () => {
    console.log(`Server berhasil running di port ${PORT}`);
});