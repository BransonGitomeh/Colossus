const Code = require('code'); // assertion library
const Lab = require('lab');
const lab = exports.lab = Lab.script();
const chai = require("chai")
const should = chai.should()
var req = require('request');

var url = 'http://localhost:3002';

lab.test('ping the server to make sure its alive', (done) => {

	req.get(url + "/", function (err, res, body) {
		Code.expect(res.statusCode).to.equal(200);
		Code.expect(body).to.equal("Hello World");
		done(err)
	});

});

lab.test('query to make new blog should return the id of the new record in the responce', (done) => {

	var newBlog = 'mutation RootMutationType { newBlog (title:"food",content:"this is an awesome delicasy") { _id } }';
	var newBlogRes = {
		"data": {
			"newBlog": {
				_id: "idHere"
			}
		}
	}

	req.post({
		url: url + "/Graph",
		formData: {
			query: newBlog
		}
	}, function (err, res, body) {
		//expect an id in the responce
		Code.expect(JSON.parse(body).data.newBlog.id);
		done(err)
	});

});


lab.test('query to get all blogs should return an array of blogs', (done) => {

	var blogs = 'query RootQueryType { blogs { title, content } }';
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
	}, function (err, res, body) {
		Code.expect(JSON.parse(body).blogs).to.be.an.array;
		done(err)
	});

});


lab.test('query to get a single blog returns a single object', (done) => {

	var blog = 'query { blog (title: "food") { _id, title comments { _id, content } } }';
	var blogRes = {
		data: {
			blog: {
				title: 'food'
			}
		}
	}

	req.post({
		url: url + "/Graph",
		formData: {
			query: blog
		}
	}, function (err, res, body) {
	    Code.expect(JSON.parse(body)).to.equal(blogRes);
		done(err)
	});

});

// create a comment for this blog
lab.test('adding a comment and return the id of the comment only', (done) => {

	var commentBlog = `mutation { commentBlog ( title:"food" content:"this blog is awesome, i like" ) { _id } }`;

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
	}, function (err, res, body) {
		Code.expect(JSON.parse(body)).to.equal(commentBlogRes);
		done(err)
	});
});

// create a comment for this blog
lab.test('get all the comments added', (done) => {

	var commentBlog = `query { comments { _id, content } }`;

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
	}, function (err, res, body) {
		Code.expect(JSON.parse(body)).to.equal(commentBlogRes);
		done(err)
	});
});

// lab.test('edit query should edit return latest modified record', (done) => {

// 	var blogEdit = 'mutation RootMutationType { editBlog (title:"Branson") { title } }';
// 	var blogEditRes = {
// 		data: {
// 			editBlog: [{
// 				title: 'Branson'
// 			}]
// 		}
// 	}

// 	req.post({
// 		url: url + "/Graph",
// 		formData: {
// 			query: blogEdit
// 		}
// 	}, function(err, res, body) {
// 		Code.expect(JSON.parse(body)).to.equal(blogEditRes);
// 		done(err)
// 	});

// });

lab.test('delete query should edit return latest modified record', (done) => {

	var blogEdit = 'mutation { deleteBlog ( title:"food" ) { _id } }';

	req.post({
		url: url + "/Graph",
		formData: {
			query: blogEdit
		}
	}, function (err, res, body) {
		Code.expect(JSON.parse(body).data.deleteBlog.id);
		done(err)
	});

});

// lab.test('getting all the comments in a blog by id.', (done) => {

// 	var comments = 'query RootQueryType { blog { comments { content, age } } }';
// 	var commentsRes = {
// 		data: {
// 			blog: {
// 				comments: [{
// 					content: "this is a whack blog man, shut it down",
// 					age: "2 days ago"
// 				}]
// 			}

// 		}
// 	}

// 	req.post({
// 		url: url + "/Graph",
// 		formData: {
// 			query: comments
// 		}
// 	}, function(err, res, body) {
// 		Code.expect(JSON.parse(body)).to.equal(commentsRes);
// 		done(err)
// 	});

// });

// lab.test('getting all the blogs available with their comments.', (done) => {

// 	var comments = 'query RootQueryType { blogs { comments { content, age } } }';
// 	var commentsRes = {
// 		data: {
// 			"blogs": [{
// 				"comments": [{
// 					"age": "2 days ago",
// 					"content": "this is a whack blog man, shut it down"
// 				}]
// 			}, {
// 				"comments": [{
// 					"age": "2 days ago",
// 					"content": "this is a whack blog man, shut it down"
// 				}]
// 			}]
// 		}
// 	}


// 	req.post({
// 		url: url + "/Graph",
// 		formData: {
// 			query: comments
// 		}
// 	}, function(err, res, body) {
// 		Code.expect(JSON.parse(body)).to.equal(commentsRes);
// 		done(err)
// 	});

// });

lab.experiment('math', () => {

	lab.test('returns true when 1 + 1 equals 2', (done) => {
		Code.expect(1 + 1).to.equal(2);
		done();
	});

});
