# [SNY-API](https://github.com/softwareneedsyou/sny-api)
## API
This is the API for the [SNY](https://github.com/softwareneedsyou) project. It uses nodejs and MySQL to store
the data.

## Getting started
Once the repo cloned, and considering you have a local database set up properly, you can do the following:
```bash
npm install
NODE_ENV='dev' npm start # this uses a local MySQL database
NODE_MYSQL_DATABASE npm start # if you want to use docker. You'll need to follow the instructions below
```

## MySQL
To setup the database nicely, you can use a local database. Credentials are set up in the `config.js` file. You
can also take a look a the docker option if you wanna go that way.

## Docker
Docker can be used to host the mysql server. To do so, once docker is installed, type:
```bash
# first create a dedicated subnet for those containers
docker network create --subnet=172.21.0.0/16 sny
# Then download and fire up the MySQL container
docker run --name sny -e MYSQL_ROOT_PASSWORD='toor' -d mysql:latest
# You'll need to create the database in order for Sequelize to populate it
$ mysql -uroot -ptoor -h172.21.0.2
mysql> CREATE DATABASE sny;
Query OK, 1 row affected (0.00 sec)
```

You now have a mysql container running, which resides now on the `172.21.0.2` ip address.
