'use strict';

/****add module for oracle database connection***/
/*var oracledb = require('oracledb');

/****create pool connection from database***/
/*oracledb.createPool(connAttrs, function(err,results) {
  if (err) {
    console.log(err);
    return;
  }else
  {
	 console.log("Created pool connection");
  }
});  */

/****Classfied booking main category list API**

 request data in req*/
exports.QBCMainCatlist = function(req, res,next) 
{	 
	let requestData = req.body;
	
	//console.log("requestData===",requestData);
	/**Validate request data**/
	if(requestData == undefined)
	{
		res.status(400);
        res.json({
             message:LANGTEXT.REQUIRED_DATA,
			 error: true,
        });
	}else 
	if(requestData.compcode == undefined || requestData.compcode == '')
	{
		res.status(400);
        res.json({
             message:LANGTEXT.REQUIREDCMPCODE,
			 error: true,
        });
	}else 
	if(requestData.booking == undefined || requestData.booking == '')
	{
		res.status(400);
        res.json({
             message:LANGTEXT.REQUIREDBOOKINGTYPE,
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
				let bindVariable =  { compcode: requestData.compcode,
									  booking: requestData.booking,
									  p_accounts: { dir: oracledb.BIND_OUT, type: oracledb.CURSOR},
									};
				    connection.execute('BEGIN book_advcategory1.book_advcategory1_p(:compcode, :booking,:p_accounts); END;',bindVariable,
				  function (err, result) 
				  {
					if (err) 
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
						let numRows =parseInt(process.env.NUMROWS); 
						let resultSet =  result.outBinds.p_accounts;
						let resultData = [];
						fetchRowsFromRS(connection, resultSet, numRows,resultData,res); 
					}
				});
			}
		});
	}
}



/****Classfied booking sub category list API**

 request data in req*/
exports.QBCSubCatlist = function(req, res,next) 
{	 
	let requestData = req.body;
	
	//console.log("requestData===",requestData);
	/**Validate request data**/
	if(requestData == undefined)
	{
		res.status(400);
        res.json({
             message:LANGTEXT.REQUIRED_DATA,
			 error: true,
        });
	}else 
	if(requestData.compcode == undefined || requestData.compcode == '')
	{
		res.status(400);
        res.json({
             message:LANGTEXT.REQUIREDCMPCODE,
			 error: true,
        });
	}else 
	if(requestData.catcode == undefined || requestData.catcode == '')
	{
		res.status(400);
        res.json({
             message:LANGTEXT.REQUIREDCATCODE,
			 error: true,
        });
	}
	else 
	if(requestData.agencytype == undefined || requestData.agencytype == '')
	{
		res.status(400);
        res.json({
             message:LANGTEXT.REQUIREDAGENCYTYPE,
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
				let bindVariable =  { compcode: requestData.compcode,
									  catcode: requestData.catcode,
									  agencytype:requestData.agencytype,
									  P_Accounts: { dir: oracledb.BIND_OUT, type: oracledb.CURSOR},
									   P_Accounts1: { dir: oracledb.BIND_OUT, type: oracledb.CURSOR},
									};
				    connection.execute('BEGIN erpmain.Book_Advsubcattyp.book_advsubcattyp_P(:compcode, :catcode,:agencytype,:P_Accounts,:P_Accounts1); END;',bindVariable,
				  function (err, result) 
				  {
					if (err) 
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
					let numRows =parseInt(process.env.NUMROWS); 
					let resultSet =  result.outBinds.P_Accounts;
					let resultData = [];
					fetchRowsFromRS(connection, resultSet, numRows,resultData,res);
					}
				});
			}
		});
	}
}


/**Get multiple rows in resultset and give response**/
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
      } 
	  else if (rows.length > 0) 
	  {
		  /**pushing rows in array**/
		for (var i = 0, l = rows.length; i < l; ++i) 
		{		
            resultData.push(rows[i]);				   
        }
        fetchRowsFromRS(connection, resultSet,numRows,resultData,res);  // get next set of rows
      }				
    });
}
