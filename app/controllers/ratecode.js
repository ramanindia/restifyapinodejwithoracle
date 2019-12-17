'use strict';

/****Start classfied booking eye cacher list according to category id and umo id API **
 request data in req**/
exports.getRateCodeList = function(req, res,next) 
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
	if(requestData.pcompcode == undefined || requestData.pcompcode == '')
	{
		res.status(400);
        res.json({
             message:LANGTEXT.REQUIREDCMPCODE,
			 error: true,
        });
	}else 
	if(requestData.padcat == undefined || requestData.padcat == '')
	{
		res.status(400);
        res.json({
             message:LANGTEXT.REQUIREDCATCODE,
			 error: true,
        });
	}else 
	if(requestData.pbranch == undefined || requestData.pbranch == '')
	{
		res.status(400);
        res.json({
             message:LANGTEXT.REQUIREDBRANCHCODE,
			 error: true,
        });
	}else 
	if(requestData.recepitDate == undefined || requestData.recepitDate == '')
	{
		res.status(400);
        res.json({
             message:LANGTEXT.REQUIREDBOOKINGRECEPITDATE,
			 error: true,
        });
	}else 
	if(requestData.uom == undefined || requestData.uom == '')
	{
		res.status(400);
        res.json({
             message:LANGTEXT.REQUIREDUMOCODE,
			 error: true,
        });
	}
	else
	{
		oracledb.getConnection(connAttrs,function(err,connection)
		{
			if(err)
			{
				console.log("err1",err)
				res.status(400);
				res.json({
						error: true,
						message:LANGTEXT.DATABASECONNECTIONERROR
					});
			}
			else
			{
					let bindVariable = { pcompcode:requestData.pcompcode,
									  padcat: requestData.padcat,
									  pbranch: requestData.pbranch,
									  pextra1: requestData.recepitDate,
									  pextra2: requestData.uom,
									  p_accounts: { dir: oracledb.BIND_OUT, type: oracledb.CURSOR},
									  p_accounts1: { dir: oracledb.BIND_OUT, type: oracledb.CURSOR},
									};
				    connection.execute('BEGIN erp_qbc.bindratecodecenterwise(:pcompcode, :padcat,:pbranch,:pextra1,:pextra2,:p_accounts,:p_accounts1); END;',bindVariable,
				  function (err, result) 
				  {
					if (err) 
					{ 
						console.log("err2",err)
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


/****END classfied booking eye cacher list according to category id and umo id API **/



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


