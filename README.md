PR-BOT

this is a simple express server accepting POST requests from GitHub webhooks. 
It will listen for pull_request events and check if the PR has a some pre-defined labels.
If it does, it will send a slack message to the FE/BE pr channel and tag the relevant developers.


## Setup
need to have a DB with the 2 tables (see seed.js file),
and the node env vars:
SLACK_TOKEN and SLACK_CHANNEL_ID (in KEEPER)

then running the server on some opened to the workd infra and in git hooks set the hook server url (see what is currently defined for heroku)


