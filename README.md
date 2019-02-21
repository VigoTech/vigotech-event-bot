# Install

`yarn` or `npm install`

Rename `.env.example` to `.env` and set values

# Execute

  `./events-bot help`


### Publish daily summary

  `./events-bot daily`

### Publish al upcoming events
  Create a tweet on every upcoming event

  `./events-bot upcoming [minutes]`

  _minutes_ default value 60

# Deploy

  `$ansible-playbook deploy.yml -i production`
