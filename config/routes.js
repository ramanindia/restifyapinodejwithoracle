'use strict';
module.exports = function (server,controllers)
 {
	 /* server.put('/savepost', controllers.post.savepost);  */
     server.get('/postlist', controllers.user.postlist); 
	 server.post('/user/login', controllers.user.login); 
	 server.post('/user/details', controllers.user.clientDetails); 
	 server.post('/mainCatlist', controllers.category.QBCMainCatlist); 
	 server.post('/subCatlist', controllers.category.QBCSubCatlist); 
	 server.post('/umolist', controllers.qbc.UOMlist); 
	 server.post('/eyecatchercatumolist', controllers.qbc.eyeCatcherCatUMOList); 
	 server.post('/eyecatcheralllist', controllers.qbc.eyeCatcherAllList); 
	 server.post('/packagelist', controllers.qbc.packageList); 
	 server.post('/ratecodelist', controllers.ratecode.getRateCodeList); 
	 server.post('/creditlimit', controllers.qbc.getCreditLimit);
	 /* server.del('/deletepost', controllers.post.deletepost); 
	 server.put('/updatepost', controllers.post.updatepost);  */

}
