const Blog = require('../models/blog');

const blog_index =  (req, res) => {
	Blog.find()
		.sort({ createdAt: -1 })
		.then((result) => {
			res.render('blogs/index', { title: 'Home', blogs: result });
		})
		.catch((err) => console.log(err));
}

const blog_create_post = (req, res) => {
	const newBlog = new Blog(req.body);
	newBlog
		.save()
		.then((result) => {
			res.redirect('/');
		})
		.catch((err) => {
			console.log(err);
		});
}

const blog_create = (req, res) => {
	res.render('blogs/create', { title: 'Create a new blog' });
}

const blog_details = (req, res) => {
	Blog.findById(req.params.id)
		.then((result) => {
			res.render('blogs/details', { blog: result, title: 'Blog Details' });
		})
		.catch((err) => {
			res.status(404).render('404', {title: 'Blog Not Found'})
		});
}

const blog_delete = (req, res) => {
	Blog.findByIdAndDelete(req.params.id)
		.then((result) => {
			res.json({ redirect: '/' });
		})
		.catch((err) => console.log(err));
}

module.exports = {
    blog_index,
    blog_create_post,
    blog_create,
    blog_details,
    blog_delete
}