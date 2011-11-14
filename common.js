var GITAPIROOT = "https://api.github.com";

function fetchPullRequests(callback) {
	$.ajax({
		url: GITAPIROOT + '/repos/Uncodin/nowtu-android/pulls',
		success: function(res){
			localStorage.setItem("pullRequests", JSON.stringify(res));
			callback(res);
		},
		beforeSend: function (xhr) {
			xhr.setRequestHeader ("Authorization", 
			"Basic " + Base64.encode(localStorage.getItem('username') + ":" + localStorage.getItem('password')));
		}
	});
}


function fetchUserRepos(accessToken, callback) {
	$.ajax({
		url: GITAPIROOT + '/user/repos' + '?access_token=' + accessToken,
		success: function(res){
			callback(res);
		}
	});
}

function fetchUserOrgs(accessToken, callback) {
	$.ajax({
		url: GITAPIROOT + '/user/orgs' + '?access_token=' + accessToken,
		success: function(res){
			callback(res);
		}
	});
}

function fetchOrgRepos(accesstoken, org, callback) {
	$.ajax({
		url: GITAPIROOT + '/orgs/' + org + '/repos' + '?access_token=' + accessToken,
		success: function(res){
			callback(res);
		}
	});
}