## example-leveldb-user-auth


### quick start

```
$ npm install
$ npm start
```


I haven't built a frontend for this yet but you get send POST and GET with cURL to see some authentication in the terminal.

There are still a lot of test that need to be written and bugs to fix.

####sign up
```
> curl -vX POST http://localhost:9090/signup \
       -H 'Content-Type:application/x-www-form-urlencoded' \
       -d 'username=cool&password=wow'
```

####login
```
> curl -X POST http://localhost:9090/login -d 'username=cool&password=wow'
```
