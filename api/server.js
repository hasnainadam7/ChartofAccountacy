const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const PORT = 4000;
const cors = require('cors');
const mongoose = require('mongoose');
const config = require('./DB.js');

//const businessRoute = require('./location.route');
//const contactRoutes = require('./type.route');
const chartacRoute = require('./chartacApi/chartac_route');
//const projectRoutes = require ('./project.route')
//const installmentRoutes = require('./installment.route')
//const policyRoutes = require('./policy.route')
mongoose.Promise = global.Promise;

mongoose.connect(config.DB, { useNewUrlParser: true }).then(
  () => {console.log('Database is connected') },
  err => { console.log('Can not connect to the database'+ err)}
);

app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// app.use('/business', businessRoute);
// app.use('/contacts', contactRoutes);
app.use('/chartacApi/account', chartacRoute);
// app.use('/project', projectRoutes);
// app.use('/installment',installmentRoutes)
// app.use ('/policy',policyRoutes)
app.listen(PORT, function(){
  console.log('Server is running on Port:',PORT);
}); 