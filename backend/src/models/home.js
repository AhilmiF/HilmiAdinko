const db = require('../config/database');

const getHome = (req, res) => {
    const SQLQuery = 'SELECT * FROM home';
    return db.execute(SQLQuery);
}

//kalo belum connect db
// const getHome = (req, res) => {
//     res.json({
//         message: 'Welcome to Adinko Home Page by Hilmi',
//         data: null
//     });
// };

module.exports = { getHome };
