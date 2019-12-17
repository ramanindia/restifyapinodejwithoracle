'use strict';
/*var oracledb = require('oracledb');
oracledb.createPool(connAttrs, function(err,results) {
  if (err) {
    console.log(err);
    return;
  }else
  {
	 console.log("Created pool connection");
  }
});  */
//var Post       = require('../models/post');
/*save post api*/
/*exports.savepost = function(req, res,next) 
{	 
	var postModel = new Post(req.body);
	postModel.save(function(err, post) 
	{
        if(err) 
        {
      		if (err.errors)
      		{
   			 	const error = {};
    			const keys = Object.keys(err.errors);
    			keys.forEach((key) => {
        		let message = err.errors[key].message;

	            if (err.errors[key].properties && err.errors[key].properties.message) 
	            {
	                message = err.errors[key].properties.message.replace('`{PATH}`', key);
	            }
	             message = message.replace('Path ', '').replace(key,'').trim();
	             message = key+' '+message;
	             error[key] = message;
       		 });

		        res.status(400);
	            res.json({
	                type: false,
	                data:error
	            });
	         }
        } else {
        	res.status(201);
            res.json({
                type: true,
                data: post
            });
        }
    });

}*/
/*list post api*/
exports.postlist = function(req, res,next) 
{	
	oracledb.getConnection(connAttrs,function(err,connection)
	{
		if(err)
		{
		    console.log("err1",err);
			res.status(400);
	            res.json({
	                type: false,
	                data:err
	            });
		}
		else
		{
			console.log("oracledb.poolTimeout==",connection);
			
			
			connection.execute("select * from tbl_bgcolor",{},{outFormat:oracledb.OBJECT},function(err,result){
				if(err)
				{
					   console.log("err2",err);
					res.status(400);
					res.json({
						type: false,
						data:err
					});
				}
				else
				{
					 console.log("result",result);
					res.status(200);
					res.json({
						type: true,
						data: result.rows
					});
				}		
				connection.close(function(err,result){
					if(err)
					{
						console.log(err.message);
					}
					else
					{		
					  console.log("connection has closed");
					}
				});
			});
		}
	});

	
	/*Post.find({}).sort({created_date: -1}).exec(function(err, post) 
	{
        if(err) 
        {
   			 res.status(400);
	            res.json({
	                type: false,
	                data:err
	            });
        } else {
        	res.status(200);
            res.json({
                type: true,
                data: post
            });
        }
    });*/

}

/*delete content*/
/*exports.deletepost = function(req, res,next) 
{	 
	if(req.body == null || req.body.id ==null)
	{

		res.status(400);
	     res.json({
	        type: false,
	        data:"Post id is required"
	      });
	}
	else 
	{
		var id = new Object(req.body.id);
		Post.findByIdAndRemove(id,function(err, post) 
		{
	        if(err) 
	        {
	   			 res.status(400);
		            res.json({
		                type: false,
		                data:err
		            });
	        } else {
	        	if(post==null)
	        	{
					res.status(400);
		            res.json({
		                type: true,
		                message :"Post id is worng"
		            });
	        	}else
	        	{
	        	res.status(200);
	            res.json({
	                type: true,
	                message :"you have successfully delete"
	            });
	        	}
	        	
	        }
	    });

	}
}*/

/*delete content*/
/*exports.updatepost = function(req, res,next) 
{	 
	if(req.body == null || req.body.id ==null)
	{

		res.status(400);
	     res.json({
	        type: false,
	        data:"Post id is required"
	      });
	}else 
	if(req.body.title == null || req.body.content ==null)
	{

		res.status(400);
	     res.json({
	        type: false,
	        data:"title and content is required"
	      });
	}
	else 
	{
		Post.findByIdAndUpdate(req.body.id,{$set:req.body},{new: true},function(err, post) 
		{
	        if(err) 
	        {
	        	console.log(err);
	   			 res.status(400);
		            res.json({
		                type: false,
		                data:err
		            });
	        } else {
	        	if(post==null)
	        	{
					res.status(400);
		            res.json({
		                type: true,
		                message :"Post id is worng"
		            });
	        	}else
	        	{
	        	res.status(200);
	            res.json({
	                type: true,
	                message :"you have successfully update",
	                data : post
	            });
	        	}
	        	
	        }
	    });

	}
}*/