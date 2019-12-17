# An example of REST API in nodejs, using restify and save data in mongodb.
<p>Simple you run command npm install (install all required module).</p>
<p>config database change config/database.js. </p>
<p>'url' : 'mongodb://username:password@hostname:post/database'. </p>
<p>example : 'url' : 'mongodb://127.0.0.1:27017/test'.</p>
<p>Change port number in .env file.</p>
<p>HOST_NAME= http://13.126.89.183:5000/. </p>
<p>create database test in mongodb. Save API data in posts collection</p>
<p>I used post,put,get and delete method.</p>
<p>you can run http://13.126.89.183:5000/.</p>
<p>Application API is running on aws server.This is live url:http://13.126.89.183:5000/.</p>

<h1>Add post API</h1>
 <p>API URL : http://13.126.89.183:5000/savepost </p>
<p> Method : PUT
 <p>Request data  :<br/> title:Upcoming event<br/>
				 content:This is a good event <br/>
				 Body in form data</p>
<p>Response data :</p>
<br/>
<p> {
    "type": true,
    "data": {
        "__v": 0,
        "title": "Upcoming event",
        "content": "This is a good event",
        "_id": "5a107226718cc5767340a470",
        "created_date": "2017-11-18T17:47:18.682Z"
    }
}</p>
 <h1>post List  API</h1>
 <p>API URL : http://13.126.89.183:5000/postlist </p>
 <p>Method : GET</p>
<p>Response data :</br>{
    "type": true,
    "data": [
        {
            "_id": "5a107226718cc5767340a470",
            "title": "Upcoming event",
            "content": "This is a good event",
            "__v": 0,
            "created_date": "2017-11-18T17:47:18.682Z"
        },
        {
            "_id": "5a1071e0718cc5767340a46f",
            "title": "suman  is dancing",
            "content": "ggbdfgd",
            "__v": 0,
            "created_date": "2017-11-18T17:46:08.690Z"
        },
        {
            "_id": "5a107178718cc5767340a46e",
            "title": "dfgdfgd",
            "content": "d dfsf fgdfgdff",
            "__v": 0,
            "created_date": "2017-11-18T17:44:24.046Z"
        }
    ]
}</p>

<h1>Delete post API</h1>
 <p>API URL : http://13.126.89.183:5000/savepost </p>
 <p>Method : DELETE</p>
 <p>Request data </br> : id:5a0876b7cd36f37d52dd1062 <br/>
				 Body in form data</p>
<p>Response data :</br> {
    "type": true,
    "message": "you have successfully delete"
}</p>

<h1>Update post API</h1>
 <p>API URL : http://13.126.89.183:5000/updatepost</p>
 <p>Method : PUT</p>
 <p>Request data  :</br> id:5a107178718cc5767340a46e<br/>
				content:update content here<br/>
				title:update title <br/>
				 Body in form data</p>
<p>Response data :</br> {
    "type": true,
    "message": "you have successfully update",
    "data": {
        "_id": "5a107178718cc5767340a46e",
        "title": "update title ",
        "content": "update content here",
        "__v": 0,
        "created_date": "2017-11-18T17:44:24.046Z"
    }
}</p>