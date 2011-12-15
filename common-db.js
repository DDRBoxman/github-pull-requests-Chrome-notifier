var db = openDatabase('mydb', '1.0', 'Github database', 2 * 1024 * 1024);

db.transaction(function (tx) {
	tx.executeSql('CREATE TABLE IF NOT EXISTS repos (ID INTEGER PRIMARY KEY ASC, name TEXT, owner TEXT, description TEXT, checkForPulls BOOL)');
	tx.executeSql('CREATE TABLE IF NOT EXISTS pullrequests (ID INTEGER PRIMART KEY ASC, title TEXT, body TEXT, created DATETIME, updated DATETIME, number INT, htmlUrl TEXT)');
});


function persistRepos(repos) {
	
	db.transaction(function (tx) {
		for (i in repos) {
			name = repos[i].name;
			description = repos[i].description;
			url = repos[i].url;
			owner = repos[i].owner.login;

			tx.executeSql('INSERT INTO repos (name, owner) VALUES (?,?)',[name, owner]);
		}
	});
}

