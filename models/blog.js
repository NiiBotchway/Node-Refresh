const { shuffle } = require('lodash');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const blogSchema = new Schema(
	{
		title: { type: String, required: true },
		snippet: { type: String, required: true },
		body: { type: String, required: true },
	},
	{ timestamps: true }
);

// blogSchema.virtual('_title').get(function() { return this.$locals; }).set(function(v) { this.$locals = this.title; });

blogSchema.pre('save', (next) => {
	//this.$locals.title = this.title
	//var self = this;
	console.log(
		'\x1b[33m%s\x1b[0m',
		`--------- Saving new blog ---------`
	);
	next();
});

blogSchema.post('save', (data) => {
	console.log(
		'\x1b[32m%s\x1b[0m',
		`--------- saved blog with title ${data.title}---------`
	);
});

const Blog = mongoose.model('Blog', blogSchema, 'blogs');
module.exports = Blog;
