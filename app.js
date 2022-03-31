const express = require('express');
const mongoose = require('mongoose');
const blogRoutes = require('./routes/blogRoutes');
if (process.env.NODE_ENV !== 'production') {
	require('dotenv').config();
}

const app = express();
const PORT = process.env.PORT || 3000;

//connecting to mongodb

//const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.MONGODB_USERNAME}:${encodeURIComponent(
	process.env.MONGODB_PASSWORD
)}@gql.qzcay.mongodb.net/gql?retryWrites=true&w=majority`;

mongoose
	.connect(uri, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		//serverApi: ServerApiVersion.v1,
	})
	.then((res) => app.listen(PORT))
	.catch((err) => console.log('Remote MongoDB Server Error', err));

//register view engine
app.set('view engine', 'ejs');

//register middleware and static files
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

//listen for requests
app.get('/', (req, res) => {
	res.redirect('/blogs');
});

app.get('/about-us', (req, res) => {
	res.redirect('/about');
});

app.get('/about', (req, res) => {
	res.render('about', { title: 'About' });
});

app.use('/blogs', blogRoutes);

//404 page
app.use((req, res) => {
	res.status(404).render('404', { title: '404 - Not Found' });
});
