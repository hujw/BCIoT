# setup
- npm install
- modify node_modules/swarm/lib/swarm.js (bzzr -> bzz-raw)
- cp .env.example .env  and modify the content
- modify config in config/ (ex: accountaddr, contractaddr)


# pre require package
- sqlite
- mariadb or mysql
- redis
- ganache-cli
- swarm (docker or git)

# develop
- execute command 'redis-server /usr/local/etc/redis.conf'
- execute command 'ganache-cli'
- docker run -p 8501:8500/tcp -e PASSWORD=1234 -t ethdevops/swarm:latest  --httpaddr=0.0.0.0 --bzznetworkid 1234 --debug --verbosity 4
- node server.js

# produciton
- npm run start
- or use pm2
