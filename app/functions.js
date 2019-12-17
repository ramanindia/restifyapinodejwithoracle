'use strict';
module.exports = 
{
	closeConnection: function(connection) 
	{
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
  },
}


