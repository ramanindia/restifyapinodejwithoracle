'use strict';

/****add module for json web token ***/
var jwt = require('jsonwebtoken');


/****User login API***/
exports.login = function(req, res,next) 
{	 
	let requestData = req.body;
	/**Validate request data**/
	if(requestData == undefined)
	{
		res.status(400);
        res.json({
             message:LANGTEXT.REQUIRED_DATA,
			 error: true,
        });
	}else 
	if(requestData.username == undefined || requestData.username == '')
	{
		res.status(400);
        res.json({
             message:LANGTEXT.REQUIREDUSERNAME,
			 error: true,
        });
	}else 
	if(requestData.password == undefined || requestData.password == '')
	{
		res.status(400);
        res.json({
             message:LANGTEXT.REQUIREDPASSWORD,
			 error: true,
        });
	}else 
	if(requestData.device_token == undefined || requestData.device_token == '')
	{
		res.status(400);
        res.json({
             message:LANGTEXT.REQUIREDDEVICETOKEN,
			 error: true,
        });
	}
	else 
	if(requestData.os == undefined || requestData.os == '')
	{
		res.status(400);
        res.json({
             message:LANGTEXT.REQUIREDOS,
			 error: true,
        });
	} 
	else
	{
		oracledb.getConnection(connAttrs,function(err,connection)
		{
			if(err)
			{
				res.status(400);
				res.json({
						error: true,
						message:LANGTEXT.DATABASECONNECTIONERROR
					});	
			}
			else
			{
				let userUsername = "'"+requestData.username+"'";
				let userPassword = "'"+requestData.password+"'";
				let loginQuery ='select "username","STATUS","userid","Agency_code","EMAIL","FIRSTNAME","LASTNAME" from LOGIN where "username"='+userUsername+' and "password"='+userPassword+' and ROWNUM=1';
				
				console.log("loginQuery====",loginQuery);
				
				connection.execute(loginQuery,{},{outFormat:oracledb.OBJECT},function(err,result){
					if(err)
					{
						res.status(400);
						res.json({
							error: true,
							 message:LANGTEXT.LOGINERROR,
						});
						FUNCTIONS.closeConnection(connection);	
					}
					else
					{
						let resultData =result.rows;
						res.status(200);
						if(resultData.length > 0)
						{
							 let clientData= resultData[0];
							 
							 if(clientData.STATUS=='A')
							 {
								 /**update query**/
								 let device_token = "'"+requestData.device_token+"'";
								 let os = "'"+requestData.os+"'";
								  
								 let updateQuery = 'update login set device_token='+device_token+' , os='+os+' where "username"='+userUsername+' and "password"='+userPassword+'';

								//connection.execute(loginQuery,{},{outFormat:oracledb.OBJECT});
								connection.execute(updateQuery,{},{autoCommit: true},function(err,result){
									
									if(err)
									{
										console.log(err);
										res.status(400);
										res.json({
											error: true,
											 message:LANGTEXT.LOGINERROR,
										});
										FUNCTIONS.closeConnection(connection);	
									}else
									{										
										/**get jwt token and return in respose data**/
										let login_token = jwt.sign(requestData, tokenScret);
									   clientData.token = login_token;
									   clientData.os = requestData.os;
									   clientData.device_token = requestData.device_token;
										res.json({
										error: false,
										message: LANGTEXT.SUCCESSLOGIN,
										data: clientData});
										
									}
									FUNCTIONS.closeConnection(connection);	
								});
								
							
							 }else
							 {
								res.json({
									error: false,
									message: LANGTEXT.ACCOUNTNOTACTIVE,
								}); 
								FUNCTIONS.closeConnection(connection);	
							 }
						}
						else
						{
							res.json({
								error: false,
								message: LANGTEXT.INVALIDUSERNAME,
								data: result.rows
							});
							FUNCTIONS.closeConnection(connection);	
						}						
					}		
					
				});
			}
		});
	}
}

/****client Details API**
 request data in req*/
exports.clientDetails = function(req, res,next) 
{	 
	let requestData = req.body;
	
	//console.log(req);
	//console.log(req.param);
	
	//console.log(requestData);
	
	/**Validate request data**/
	if(requestData == undefined)
	{
		res.status(400);
        res.json({
             message:LANGTEXT.REQUIRED_DATA,
			 error: true,
        });
	}else 
	if(requestData.userid == undefined || requestData.userid == '')
	{
		res.status(400);
        res.json({
             message:LANGTEXT.REQUIREDUSERID,
			 error: true,
        });
	}
	else
	{
		oracledb.getConnection(connAttrs,function(err,connection)
		{
			if(err)
			{
				res.status(400);
				res.json({
						error: true,
						message:LANGTEXT.DATABASECONNECTIONERROR
					});
			}
			else
			{
				let userID = "'"+requestData.userid+"'";
				let selectquery ='select "username","STATUS","userid","Agency_code","EMAIL","FIRSTNAME","LASTNAME" from LOGIN where "userid"='+userID+' and ROWNUM=1';
				//console.log("loginQuery====",loginQuery);
				connection.execute(selectquery,{},{outFormat:oracledb.OBJECT},function(err,result){
					if(err)
					{
						res.status(400);
						res.json({
							error: true,
							 message:LANGTEXT.DATABASEXECERRROR,
						});
						FUNCTIONS.closeConnection(connection);	
					}
					else
					{
						let resultData =result.rows;
						res.status(200);
						if(resultData.length > 0)
						{
							 let clientData= resultData[0];

							res.json({
							error: false,
							message: LANGTEXT.SUCCESSLOGIN,
							data: clientData});
										
							
							 
						}
						else
						{
							res.json({
								error: false,
								message: LANGTEXT.INVALIDUSERNAME,
								data: result.rows
							});
						}						
					}		
					FUNCTIONS.closeConnection(connection);	
				});
			}
		});
	}
}


/*list post api*/
exports.postlist = function(req, res,next) 
{	
console.log("preocee",process.env.NUMROWS);
	/*jwt.verify('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmb28iOiJiYXIiLCJpYXQiOjE1NTUwNTEzODh9.WN1jz9vkiO15UnPUp5WRq9WlW757UY5MQKGi-Qs6GQ',	 tokenScret, function(err, decoded) 
	{
	  console.log("err",err.message);
	  console.log(decoded) 
	});*/
	
	
	oracledb.getConnection(connAttrs,function(err,connection)
	{
		if(err)
		{
			res.status(400);
	            res.json({
	                type: false,
	                data:err
	            });
		}
		else
		{
		let bindVariable =  { compcode:   'RP001',
							  booking:'adtype',
							  p_accounts: { dir: oracledb.BIND_OUT, type: oracledb.CURSOR},
							 };
	connection.execute(
	 'BEGIN book_advcategory1.book_advcategory1_p(:compcode, :booking,:p_accounts); END;',
	 bindVariable,
			  function (err, result) 
			  {
				if (err) { console.error("error===",err); return; }
				let numRows =parseInt(process.env.NUMROWS); 
				//console.log("Procudre is coming");
				//console.log(result);
				//console.log("results data are ===",result.rows);
				
				//console.log(result.outBinds.p_accounts);
				
				let catData = result.outBinds.p_accounts;
				let resultSet =  result.outBinds.p_accounts;
				//console.log(catData.getRows);
				//console.log(result.outBinds.p_accounts);
				
				 //fetchRowsFromRS(connection, result.outBinds.p_accounts, numRows);
				 /*	result.outBinds.p_accounts.getRows( // get numRows rows
						numRows,
						function (err, rows)
						{
						  if (err) {
							 console.log("Error===",err);                     // close the result set and release the connection
						  } else if (rows.length == 0) {  // no rows, or no more rows
							console.log("Records is 0===");                                     // close the result set and release the connection
						  } else if (rows.length > 0) {
							console.log(rows);
							//fetchRowsFromRS(connection, resultSet, numRows);  // get next set of rows
						  }
						});*/
						let resultData = [];
				fetchRowsFromRS(connection, resultSet, numRows,resultData,res); 
			});



			
		/*	connection.execute(
  `BEGIN :ret := myfunc(); END;`,
  { ret: { dir: oracledb.BIND_OUT, type: oracledb.STRING, maxSize: 40 } },
  function (err, result) {
    if (err) { console.error(err.message); return; }
    console.log(result.outBinds);
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
  
  });*/
  
    
			/*connection.execute("select * from tbl_bgcolor",{},{outFormat:oracledb.OBJECT},function(err,result){
				if(err)
				{
					 
					res.status(400);
					res.json({
						type: false,
						data:err
					});
				}
				else
				{
					 //console.log("result",result);
					res.status(200);
					res.json({
						type: true,
						data: result.rows
					});
				}		
				
				});*/

			/*connection.execute(
			  `BEGIN finalqbcprocu(:empid, :name); END;`,
  {  // bind variables
    empid:   86,
    name: { dir: oracledb.BIND_OUT, type: oracledb.STRING, maxSize: 40 },
  },
			  function (err, result) 
			  {
				if (err) { console.error("error===",err); return; }
				console.log("Procudre is coming");
				console.log(result);
				console.log(result.outBinds);
				
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
			 
			
			});*/
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

function fetchRowsFromRS(connection, resultSet, numRows,resultData,res)
{   
	let returnData ={};
	resultSet.getRows( // get numRows rows
    numRows,
    function (err, rows)
    {
      if (err) 
	  {
		 /**close this connection**/
		 FUNCTIONS.closeConnection(connection);	
		 
		 returnData.error = true;
		  returnData.message = LANGTEXT.DATABASEXECERRROR;
		  return returnData;
		res.status(400);
		 res.json({
			error: true,
			 message:LANGTEXT.DATABASEXECERRROR,
		});                    
      }  /** no rows, or no more rows**/
	  else if (rows.length == 0) 
	  { 		
		/** close the result set and release the connection**/
			resultSet.close( function(err) 
			{
			   FUNCTIONS.closeConnection(connection);	
			});			
			/*Give response in json*/
		    res.status(400);
			res.json({
			error: false,
			message: LANGTEXT.FETCHDATASUCCESS,
			data: resultData
			});
			returnData.error = false;
			returnData.message = LANGTEXT.FETCHDATASUCCESS;
			returnData.data = resultData;
		  return returnData;
      } 
	  else if (rows.length > 0) 
	  {
		  /**pushing rows data in array**/
		for (var i = 0, l = rows.length; i < l; ++i) 
		{		
            resultData.push(rows[i]);				   
        }
        fetchRowsFromRS(connection, resultSet,numRows,resultData,res);  // get next set of rows
      }				
    });
}

	/*connection.close(function(err,result){
					if(err)
					{
						console.log(err.message);
					}
					else
					{		
					  console.log("connection has closed");
					}
			  });*/
			  
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