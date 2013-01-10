$(document).ready(function() {
		
		var provider = window['github'];
		
		if (provider.get('accessToken')) {
			$("#pullRequestsDiv").show();
			showPullRequests();
		}
		else {
				$("#pullRequestsDiv").hide();
				var myid = chrome.i18n.getMessage("@@extension_id");
				chrome.tabs.create({'url': 'chrome-extension://' + myid + '/options.html'}, function(tab) {});
				window.close();
			
		}
	});

	function showPullRequests() {
			html = "";

			db.transaction(function (tx) {
				tx.executeSql("SELECT * FROM pullRequests", [], function(tx, rs) {
					for (var i=0; i<rs.rows.length; i++) {
						r = rs.rows.item(i);
						html += "<a href='" + r.htmlUrl + "'>" + r.title + "</a></br>";
					}	

					if (html == "") {
						html += "<h4>No outstanding pull requests</h4><h5>Maybe go write some code? :)</h5>";
					}

					$('#pullRequestsDiv').html(html);

					$("a").click(function(e) {
						chrome.tabs.create({'url': e.target.href}, function(tab) {});
						window.close();
					});
				});
			});
	}
