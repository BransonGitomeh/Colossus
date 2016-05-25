const Code = require('code'); // assertion library
const Lab = require('lab');
const lab = exports.lab = Lab.script();
var req = require('request');

var url = 'http://localhost:3002';

lab.test('ping the server to make sure its alive', (done) => {

	req.get(url + "/", function(err, res, body) {
		Code.expect(res.statusCode).to.equal(200);
		Code.expect(body).to.equal("Hello World");
		done(err)
	});

});

lab.test('query to make new blog should return the same injected values in the responce ', (done) => {

	var newBlog = 'mutation RootMutationType { newBlog (title:"food",content:"this is an awesome delicasy") { _id, title, content } }';
	var newBlogRes = {
		"data": {
			"newBlog": [{
				"_id": "1",
				"title": "food",
				"content": "this is an awesome delicasy"
			}]
		}
	}

	req.post({
		url: url + "/Graph",
		formData: {
			query: newBlog
		}
	}, function(err, res, body) {
		Code.expect(JSON.parse(body)).to.equal(newBlogRes);
		done(err)
	});

});


lab.test('query to get all blogs should return an array of blogs', (done) => {

	var blogs = 'query RootQueryType { blogs { title } }';
	var blogsRes = {
		data: {
			blogs: [{
				title: 'blog1'
			}, {
				title: 'caroline'
			}]
		}
	}

	req.post({
		url: url + "/Graph",
		formData: {
			query: blogs
		}
	}, function(err, res, body) {
		Code.expect(JSON.parse(body)).to.equal(blogsRes);
		done(err)
	});

});


lab.test('query to get a single blog returns a single object', (done) => {

	var blog = 'query RootQueryType { blog { _id, title } }';
	var blogRes = {
		data: {
			blog: {
				_id: '1',
				title: 'caroline'
			}
		}
	}

	req.post({
		url: url + "/Graph",
		formData: {
			query: blog
		}
	}, function(err, res, body) {
		Code.expect(JSON.parse(body)).to.equal(blogRes);
		done(err)
	});

});

lab.test('edit query should edit return latest modified record', (done) => {

	var blogEdit = 'mutation RootMutationType { editBlog (title:"Branson") { title } }';
	var blogEditRes = {
		data: {
			editBlog: [{
				title: 'Branson'
			}]
		}
	}

	req.post({
		url: url + "/Graph",
		formData: {
			query: blogEdit
		}
	}, function(err, res, body) {
		Code.expect(JSON.parse(body)).to.equal(blogEditRes);
		done(err)
	});

});

lab.test('delete query should edit return latest modified record', (done) => {

	var blogEdit = 'mutation RootMutationType { deleteBlog ( _id:1, title:"caroline" ) { _id } }';
	var blogEditRes = {
		data: {
			deleteBlog: [{
				_id: '1'
			}]
		}
	}

	req.post({
		url: url + "/Graph",
		formData: {
			query: blogEdit
		}
	}, function(err, res, body) {
		Code.expect(JSON.parse(body)).to.equal(blogEditRes);
		done(err)
	});

});


lab.test('adding a comment and return the id of the comment only', (done) => {

	var commentBlog = `mutation RootMutationType { 
		commentBlog ( blog_id:"1" content:"this blog is awesome, i like" ) {
		 _id 
		} 
	}`;

	var commentBlogRes = {
		data: {
			commentBlog: [{
				_id: '1'
			}]
		}
	}

	req.post({
		url: url + "/Graph",
		formData: {
			query: commentBlog
		}
	}, function(err, res, body) {
		Code.expect(JSON.parse(body)).to.equal(commentBlogRes);
		done(err)
	});

});

lab.test('getting all the comments in a blog by id.', (done) => {

	var comments = 'query RootQueryType { blog { comments { content, age } } }';
	var commentsRes = {
		data: {
			blog: {
				comments: [{
					content: "this is a whack blog man, shut it down",
					age: "2 days ago"
				}]
			}

		}
	}

	req.post({
		url: url + "/Graph",
		formData: {
			query: comments
		}
	}, function(err, res, body) {
		Code.expect(JSON.parse(body)).to.equal(commentsRes);
		done(err)
	});

});

lab.test('getting all the blogs available with their comments.', (done) => {

	var comments = 'query RootQueryType { blogs { comments { content, age } } }';
	var commentsRes = {
		data: {
			"blogs": [{
				"comments": [{
					"age": "2 days ago",
					"content": "this is a whack blog man, shut it down"
				}]
			}, {
				"comments": [{
					"age": "2 days ago",
					"content": "this is a whack blog man, shut it down"
				}]
			}]
		}
	}


	req.post({
		url: url + "/Graph",
		formData: {
			query: comments
		}
	}, function(err, res, body) {
		Code.expect(JSON.parse(body)).to.equal(commentsRes);
		done(err)
	});

});

lab.experiment('math', () => {

	lab.test('returns true when 1 + 1 equals 2', (done) => {
		Code.expect(1 + 1).to.equal(2);
		done();
	});

});