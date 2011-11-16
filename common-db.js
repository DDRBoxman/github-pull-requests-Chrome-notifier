persistence.store.websql.config(persistence, 'gitnotifydb', 'github-notifier-database', 5 * 1024 * 1024);

var PullRequest = persistence.define('PullRequest', {
  title: "TEXT",
  body: "TEXT",
  created: "TEXT",
  updated: "TEXT",
  number: "INT",
  html_url: "TEXT"
});

PullRequest.index(['number'],{unique:true});

var Repository = persistence.define('Repository', {
  name: "TEXT",
  description: "TEXT",
  url: "TEXT",
  checkForUpdates: "BOOL"
});

Repository.index(['name'],{unique:true});
Repository.hasMany('pullrequests', PullRequest, 'repository');

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

function persistPulls(pulls) {
	for (i in pulls) {
		var pull = new PullRequest();
		pull.title = pulls[i].title;
		pull.body = pulls[i].body;
		pull.created = pulls[i].created_at;
		pull.updated = pulls[i].updated_at;
		pull.number = pulls[i].number;
		pull.html_url = pulls[i].html_url;
		persistence.add(pull);
	}
	persistence.flush();
}
