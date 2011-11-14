var GITAPIROOT = "https://api.github.com";

var github = new OAuth2('github', {
    client_id: '0f27eed4ad57865f64ee',
    client_secret: 'aae37febed42b7e254519e858703b4ed5b4d8a29',
  });

function fetchPullRequests(accesstoken, callback) {
	$.ajax({
		url: GITAPIROOT + '/repos/Uncodin/nowtu-android/pulls' + '?access_token=' + accessToken,
		success: function(res){
			localStorage.setItem("pullRequests", JSON.stringify(res));
			callback(res);
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