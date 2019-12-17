'use strict';

/****Start classfied booking UMO list API**
 request data in req**/
exports.UOMlist = function(req, res,next) 
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
	if(requestData.umo_value == undefined || requestData.umo_value == '')
	{
		res.status(400);
        res.json({
             message:LANGTEXT.REQUIREDUMOVALUE,
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
				let bindVariable =  { compcode: requestData.compcode,
									  userid: requestData.userid,
									  VALUE: requestData.umo_value,
									  p_accounts: { dir: oracledb.BIND_OUT, type: oracledb.CURSOR},
									};
				    connection.execute('BEGIN binduomforrate.binduomforrate_p(:compcode,:userid, :VALUE,:p_accounts); END;',bindVariable,
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


/****End classfied booking UMO list API****/

/****Start classfied booking eye cacher list according to category id and umo id API **
 request data in req**/
exports.eyeCatcherCatUMOList = function(req, res,next) 
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
						let resultSet =  result.outBinds.p_accounts1;
						let resultData = [];
						fetchRowsFromRS(connection, resultSet, numRows,resultData,res); 
					}
				});
			}
		});
	}
}


/****END classfied booking eye cacher list according to category id and umo id API **/

/****Start classfied booking eye cacher list API**/
exports.eyeCatcherAllList = function(req, res,next) 
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
	if(requestData.compcode == undefined || requestData.compcode == '')
	{
		res.status(400);
        res.json({
             message:LANGTEXT.REQUIREDCMPCODE,
			 error: true,
        });
	}else 
	if(requestData.bullet_code == undefined || requestData.bullet_code == '')
	{
		res.status(400);
        res.json({
             message:LANGTEXT.REQUIREDBULLETCODE,
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
				console.log("err1",err)
				res.status(400);
				res.json({
						error: true,
						message:LANGTEXT.DATABASECONNECTIONERROR
					});
			}
			else
			{
				let bindVariable =  { compcode: requestData.compcode,
									  VALUE: requestData.bullet_code,
									  userid1: requestData.userid,
									  p_accounts: { dir:oracledb.BIND_OUT, type: oracledb.CURSOR},
									};
				    connection.execute('BEGIN class_bindbgcolorqbc.class_bindbgcolorqbc_p(:compcode, :VALUE,:userid1,:p_accounts); END;',bindVariable,function (err, result) 
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

/****END classfied booking eye cacher list API**/


/****Start package list API request data in req**/
exports.packageList = function(req, res,next) 
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
	if(requestData.adtype == undefined || requestData.adtype == '')
	{
		res.status(400);
        res.json({
             message:LANGTEXT.REQUIREDADTYPE,
			 error: true,
        });
	}else 
	if(requestData.category == undefined || requestData.category == '')
	{
		res.status(400);
        res.json({
             message:LANGTEXT.REQUIREDCATCODE,
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
					let bindVariable = {compcode:requestData.pcompcode,
									  adtype: requestData.adtype,
									  category: requestData.category,
									  p_accounts: { dir: oracledb.BIND_OUT, type: oracledb.CURSOR},
									};
					
				    connection.execute('BEGIN erp_qbc.bindpackagecategorywise_api(:compcode, :adtype,:category,:p_accounts); END;',bindVariable,
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

/****Start package list API request data in req**/



/****Start package list API request data in req**/
exports.getCreditLimit = function(req, res,next) 
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
	if(requestData.comcode == undefined || requestData.comcode == '')
	{
		res.status(400);
        res.json({
             message:LANGTEXT.REQUIREDCMPCODE,
			 error: true,
        });
	}else 
	if(requestData.branchcode == undefined || requestData.branchcode == '')
	{
		res.status(400);
        res.json({
             message:LANGTEXT.REQUIREDBRANCHCODE,
			 error: true,
        });
	}else 
	if(requestData.date == undefined || requestData.date == '')
	{
		res.status(400);
        res.json({
             message:LANGTEXT.REQUIREDDATE,
			 error: true,
        });
	}else 
	if(requestData.cioid == undefined || requestData.cioid == '')
	{
		res.status(400);
        res.json({
             message:LANGTEXT.REQUIREDCIOID,
			 error: true,
        });
	}
	else 
	if(requestData.agencycode == undefined || requestData.agencycode == '')
	{
		res.status(400);
        res.json({
             message:LANGTEXT.REQUIREDAGENCYCODE,
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
			{		//bindvariable for unconfirm amount
					/*let bindVariable = {pcompcode:'RP001',
									  pbranch: 'JA0',
									  pagcode: 'BH28BHA298',
									  pdatecheck: '03/05/2019',
									  pcioid: '00168087',
									  pextra1:'C',
									  pextra2: '',
									  pextra3: '',
									  pextra4: '',
									  pextra5: '',
									  p_accounts: { dir: oracledb.BIND_OUT, type: oracledb.CURSOR},
									};
									
				    console.log("final-==bindVariable==",bindVariable);*/
									
										let bindVariable = {pcompcode:requestData.comcode,
									  pbranch: requestData.branchcode,
									  pagcode: requestData.agencycode,
									  pdatecheck: requestData.date,
									  pcioid: requestData.cioid,
									  pextra1:'C',
									  pextra2: '',
									  pextra3: '',
									  pextra4: '',
									  pextra5: '',
									  p_accounts: { dir: oracledb.BIND_OUT, type: oracledb.CURSOR},
									};
									
				   // console.log("duplicate-==bindVariableddd==",bindVariableddd);
									
				    connection.execute('BEGIN erp_qbc.check_unconfirm_bkamt(:pcompcode, :pbranch,:pagcode,:pdatecheck,:pcioid,:pextra1,:pextra2,:pextra3,:pextra4,:pextra5,:p_accounts); END;',bindVariable,
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
						let resultSet =  result.outBinds.p_accounts;
						
						 resultSet.getRows(1,function(err,row)
						{
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
								let unconfirmbamt1 ="";
								let unconfirmbamt_gst2 ="";
								
							     let UNCONFIRM_BKAMT  =  row[0];
								 
								 if(UNCONFIRM_BKAMT == null) 
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
								 
						  	 
							if(UNCONFIRM_BKAMT!=null)
							{
							  unconfirmbamt1=parseFloat(UNCONFIRM_BKAMT).toFixed(2);
							  
							  unconfirmbamt_gst2=((parseFloat(unconfirmbamt1) * 5)/100);
							
							
							
							}
             
							let unconfirmbkamt=((unconfirmbamt_gst2)+(parseFloat(unconfirmbamt1)));
							
							
							      	//bindvariable for unconfirm amount			
								console.log("unconfirmbkamt===",unconfirmbkamt);
																	
									let creditBindVariable = {compcode:requestData.comcode,
									  agcode: requestData.agencycode,
									  outstandamt: '',
									  billamt: '',
									  datecheck: requestData.date,
									  cioid:requestData.cioid,
									  modflag: '',
									  extra2: 'C',
									  extra3: requestData.branchcode,
									  extra4: '',
									  extra5: '',
									  p_accounts: { dir: oracledb.BIND_OUT, type: oracledb.CURSOR}
									  };
									  
			/*let creditBindVariable = {compcode:'RP001',
									  agcode: 'BH28BHA298',
									  outstandamt: '',
									  billamt: '',
									  datecheck: '06/05/2019',
									  cioid:'00168102',
									  modflag: '',
									  extra2: 'C',
									  extra3: 'JA0',
									  extra4: '',
									  extra5: '',
									  p_accounts: { dir: oracledb.BIND_OUT, type: oracledb.CURSOR},
									};*/
													

					
				    connection.execute('BEGIN erpmain.checkbookingcreditlimitcls(:compcode, :agcode,:outstandamt,:billamt,:datecheck,:cioid,:modflag,:extra2,:extra3,:extra4,:extra5,:p_accounts); END;',creditBindVariable,
				function (err, creditResult) 
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
						let creditResultSet =  creditResult.outBinds.p_accounts;
						
						 creditResultSet.getRows(1,function(err,creditRow)
						{
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
								let outstandamt;
								let unbilledamt;
								let creditData  =  creditRow[0];
								
								console.log("creditRow=========",creditData);
									 
								 if(creditData == null) 
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
									 let creditlmt;
									 
									
									 if(creditData[2]!=null)
									{
										 creditlmt=parseFloat(creditData[2]).toFixed(2);
									}
								   else
								   {
										 creditlmt=0;
								  }
									outstandamt=parseFloat(creditData[3]).toFixed(2);
									unbilledamt=parseFloat(creditData[4]).toFixed(2);

									
								  var finalbal=parseFloat(parseFloat(creditlmt)-(parseFloat(unconfirmbkamt)+parseFloat(unbilledamt)+parseFloat(outstandamt))).toFixed(2);
								  
							    console.log("unconfirmbkamt===",unconfirmbkamt);
								 console.log("unconfirmbamt_gst2===",unconfirmbamt_gst2);
							    console.log("unconfirmbamt1===",unconfirmbamt1);
							  console.log("UNCONFIRM_BKAMT===",UNCONFIRM_BKAMT);
							   console.log("Limit===",creditData[2]);
							    console.log("outstandamt===",outstandamt)
								 console.log("unbilledamt===",unbilledamt);
								  console.log("finalbal===",finalbal);
									let resultData = {};
									resultData.unconfirmbkamt = unconfirmbkamt;
									resultData.unconfirmbkamtGST = unconfirmbamt_gst2;
									resultData.unconfirmbkamtAfterGST = unconfirmbamt_gst2;
									resultData.limit = creditData[2];
									resultData.outstandamt = outstandamt;
									resultData.unbilledamt = unbilledamt;
									resultData.finalbal = finalbal;
									
								  res.status(200);
									res.json({
									error: false,
									message: LANGTEXT.FETCHDATASUCCESS,
									data: resultData
									});
			
								 }
		   
								//console.log("creditRow=========",creditData);
								
							}
							
						});
						
					}
				});
							
							
							}
							}
							
					
							
						});
						
						//let resultData = [];
						//fetchRowsFromRS(connection, resultSet, numRows,resultData,res); 
					}
				});
			}
		});
	}
}

/****Start package list API request data in req**/



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
		    res.status(200);
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


