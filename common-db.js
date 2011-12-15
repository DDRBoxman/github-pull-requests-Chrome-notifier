var db = openDatabase('mydb', '1.0', 'Github database', 2 * 1024 * 1024);

db.transaction(function (tx) {
	tx.executeSql('CREATE TABLE IF NOT EXISTS repos (ID INTEGER PRIMARY KEY ASC, name TEXT, owner TEXT, description TEXT, checkForPulls BOOL)');
	tx.executeSql('CREATE TABLE IF NOT EXISTS pullrequests (ID INTEGER PRIMART KEY ASC, title TEXT, body TEXT, created DATETIME, updated DATETIME, number INT, htmlUrl TEXT)');
});


function persistRepos(repos, org) {
	for (i in repos) {
		repo.name = repos[i].name;
		repo.description = repos[i].description;
		repo.url = repos[i].url;
	}
}

function persistOrgs(orgs) {
	for (i in orgs) {
		org.login = orgs[i].login;
	}
}

function persistPulls(pulls) {
	for (i in pulls) {
		pull.title = pulls[i].title;
		pull.body = pulls[i].body;
		pull.created = pulls[i].created_at;
		pull.updated = pulls[i].updated_at;
		pull.number = pulls[i].number;
		pull.html_url = pulls[i].html_url;
	}
}
