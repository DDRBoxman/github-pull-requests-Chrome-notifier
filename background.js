

	chrome.extension.onRequest.addListener(
	    function (request, sender, sendResponse){
	        if(request.msg == "userAuthorized") checkPulls();
	    }
	);

	checkPulls();

	function checkPulls() {
		
		var provider = window['github'];
		
		if (provider.get('accessToken')) {
			chrome.browserAction.setBadgeBackgroundColor({color:[0, 0, 255, 100]});
			
			accessToken = provider.get('accessToken');

			db.transaction(function (tx) {
				tx.executeSql('SELECT * FROM repos WHERE checkForPulls = "true"', [], function(tx, rs) {
					var repoArray = [];
					for (var i=0; i<rs.rows.length; i++) {
						repoArray.push(rs.rows.item(i));
					}

					deletePulls();

					async.forEach(repoArray, 
						function(item, call) {

							owner = item.owner;
							repo = item.name;

							fetchPullRequest(accessToken, owner, repo, function (data) {
								persistPulls(data);
								call();
							});
						},
						function(err) {
							if (err != undefined) {
								console.log('Fetch repos failed :/');
							}
							else {
								getNumPulls(function(num) {
									if (num==undefined) {
										num = 0;
									}
									chrome.browserAction.setBadgeText({text:num + ''});
								});
							}
						});
				});
			});
		}
		else {
			chrome.browserAction.setBadgeBackgroundColor({color:[255, 0, 0, 100]});
			chrome.browserAction.setBadgeText({text:'!'});
		}
		var t=setTimeout("checkPulls()", 1000 * 60);
	}
