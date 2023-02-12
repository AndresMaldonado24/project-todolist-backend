const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const authRoutes = require('./routes/authRoutes');

/*################Settings################*/
app.set('port', process.env.PORT || 3000);
/*################Mongo Connetcion################*/
mongoose.connect( process.env.MONGODB_URI)
.then( () => console.log('Conected to MongoDB'))
.catch( (err) => console.log(err));
/*################Middleware################*/
app.use( (req,res,next) => {
	console.log(`${req.method} ${req.url}`)
	next()
});
app.use(express.json());
/*################Routes################*/
app.use('/auth/',authRoutes);
/*################Start server################*/
app.listen(app.get('port'), () => {
	console.log(`Server started on port ${app.get('port')}`)
});