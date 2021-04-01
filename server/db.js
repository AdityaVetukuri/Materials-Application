const Pool = require("pg").Pool;

const pool = new Pool({
    user: "adityavarma",
    password : "Messi",
    host : "localhost",
    port : 5432,
    databse : "cesium"
});

module.exports = pool; 