# Import git repos

## Usage:
```
 npm install
 npm run index.js
```
## Config
.env
```
GIT_SOURCE_USER=SOURCE_REPO_USER
GIT_SOURCE_PASS=SOURCE_REPO_PASS ( Bitbucket/App Password - Gitlab/Access Tokens, etc )
GIT_SOURCE_BASE_URL=https://{user}:{pass}@[SOURCE_REPO_BASE (With group/team/etc)]/

GIT_DESTINATION_USER=DEST_REPO_USER
GIT_DESTINATION_PASS=DEST_REPO_PASS ( Bitbucket/App Password - Gitlab/Access Tokens, etc )
GIT_DESTINATION_BASE_URL=https://{user}:{pass}@[DEST_REPO_BASE (With group/team/etc)]/
```

repos.json
```
[
    "my-super-repo.git"
]
```

### How it works

 * Create a working dir with name of git-importer-[TIMESTAMP]
 * Clone the source repos on this dir
 * Push the repos to the destination

### Links
 * https://git-scm.com/docs/git-clone#Documentation/git-clone.txt---bare
 * https://git-scm.com/docs/git-clone#Documentation/git-clone.txt---mirror
 * https://docs.github.com/en/github/creating-cloning-and-archiving-repositories/duplicating-a-repository


#### Issues/Not Work

 * SSH repos with key with passphrase ( use HTTPS with user pass(token) instead )