//connection to database
const mongoose = require("mongoose");
const config = require("./default.json")

mongoose.connect(config.db.connectionString,{ useNewUrlParser: true })
    .then( ()=>{ console.log('connected'); } )
    .catch( err => console.error('connection failed', err) );
