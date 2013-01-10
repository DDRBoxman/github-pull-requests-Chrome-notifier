var repolist;

/* Options Toggle */
$("#showOnlyOthersCheckbox").change(function() {
	localStorage.setItem('showOnlyOthers', $("#showOnlyOthersCheckbox").attr('checked'));
});

function loadSettings() {
	$("#showOnlyOthersCheckbox").checked = localStorage.getItem('showOnlyOthers');
}

/* OAuth */

function authorize(providerName) {
  var provider = window[providerName];
  provider.authorize(checkAuthorized);
}

function clearAuthorized() {
  console.log('clear');
  ['github'].forEach(function(providerName) {
    var provider = window[providerName];
    provider.clearAccessToken();
  });
  checkAuthorized();
}

function checkAuthorized() {
  console.log('checkAuthorized');
    var provider = window['github'];
    var button = document.querySelector('#' + 'github');
    if (provider.get('accessToken')) {

		chrome.extension.sendRequest({ msg: "userAuthorized" });

    	accessToken = provider.get('accessToken');
    	
    	fetchUserRepos(accessToken, function (res) {
			persistRepos(res);
			displayRepos();
    	});
    	
    	fetchUserOrgs(accessToken, function (res) {
		async.forEach(res,
			function(item, call) {
				org = item.login;
				fetchOrgRepos(accessToken, org, function(res) {
					persistRepos(res);
					call();	
				});
			},
			function (err) {
				if (err != undefined) {
					console.log('org repo fetch failed');
				}
				else {
					displayRepos();
				}
			}
		);
    	});
	
      button.classList.add('authorized');
    } else {
      button.classList.remove('authorized');
    }
}


function displayRepos() {
	
	db.transaction(function (tx) {
		tx.executeSql('SELECT * FROM repos ORDER BY LOWER(owner), LOWER(name)', [], function(tx, rs) {
			
			html = "";
			var displayedOwner = "";
			var openDiv = false;
			for (var i=0; i < rs.rows.length; i++) {

				r = rs.rows.item(i);

				if (displayedOwner != r.owner) {
					displayedOwner = r.owner;
					if (openDiv) {
						html += "</div></div>";	
					} else {
						openDiv = true;
					}
					html += '<div class="owner">';
					html += "<h3>" + displayedOwner  + "</h3>";
					html += '<div class="body">';
				}

				html += "<div class=\"repo\"><label><input class='repoBox' type='checkbox' name='" + r.ID + "'";
				if (r.checkForPulls == "true") {
					html += "checked";
				}
				html += "/>"  + r.name + "</label></div>";

			}

			html += '</div></div>';

			$('#userRepoList').html(html);
			
			$(".repoBox").change(function(e) {
				console.log(e.target.name + " - " + e.target.checked);
				setRepoCheck(e.target.name, e.target.checked);
				});
			});
		});
}


loadSettings();
checkAuthorized();
displayRepos();
