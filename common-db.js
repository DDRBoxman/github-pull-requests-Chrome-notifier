persistence.store.websql.config(persistence, 'gitnotifydb', 'github-notifier-database', 5 * 1024 * 1024);

var Repository = persistence.define('Repository', {
  name: "TEXT",
  description: "TEXT",
  url: "TEXT",
  checkForUpdates: "BOOL"
});

Repository.index(['name'],{unique:true});

var Organization = persistence.define('Organization', {
	login: "TEXT"
});

Organization.index(['login'],{unique:true});

Organization.hasMany('repositories', Repository, 'organization');

persistence.schemaSync();

function persistRepos(repos, org) {
	for (i in repos) {
		var repo = new Repository();
		repo.name = repos[i].name;
		repo.description = repos[i].description;
		repo.url = repos[i].url;
		persistence.add(repo);
		if (org) {
			org.repositories.add(repo);
		}
	}
	persistence.flush();
}

function persistOrgs(orgs) {
	for (i in orgs) {
		var org = new Organization();
		org.login = orgs[i].login;
		persistence.add(org);
	}
	persistence.flush();
}