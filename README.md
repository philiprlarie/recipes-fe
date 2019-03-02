# Setup steps

### Install [postgress](https://www.postgresql.org/download/macosx/) onto machine
* Use "Interactive installer by EnterpriseDB"
* Version 11.2
* add `export PATH="$PATH:/usr/local/mysql/bin:/Library/PostgreSQL/11/bin"` to .bashrc
```bash
$ sudo -su postgres
$ cd
$ psql
> create user recipes with encrypted password 'password';
> ALTER USER recipes CREATEDB;
```

### Setup and seed rails app
* `$ git clone https://github.com/philiprlarie/recipes.git`
```bash
$ rvm install "ruby-2.5.1"
$ bundle
$ bin/rake db:seed_from_csv
```
* note may need to do `gem install pg -v 1.1.3 -- --with-pg-config=/Library/PostgreSQL/11/bin/pg_config` to install pg gem

### Setup Frontent
* git clone `$ git clone https://github.com/philiprlarie/recipes-fe.git`
* install dependencies `$ yarn`

### Start the app
* in one terminal window `$ rails s`
* in another `$ ember serve`
* navigate to http://localhost:4200/recipes
