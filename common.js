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
