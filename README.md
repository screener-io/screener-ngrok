ngrok [![Build Status](https://travis-ci.org/bubenshchykov/ngrok.png?branch=master)](https://travis-ci.org/bubenshchykov/ngrok)
=====

![alt ngrok.com](https://ngrok.com/static/img/overview.png)

Ngrok exposes your localhost to the web. https://ngrok.com/

usage
===

[![NPM](https://nodei.co/npm/ngrok.png?global=true&&downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/ngrok/)

```
var ngrok = require('ngrok');
ngrok.connect(function (err, url) {});

or

npm install ngrok -g
ngrok http 8080
```

## authtoken
You can create basic http-https-tcp tunnel without authtoken. For custom subdomains and more you should  obtain authtoken by signing up at [ngrok.com](https://ngrok.com)

You can pass authtoken as option with each ```connect``` or set it once for further tunnels
```javascript
ngrok.authtoken(token, function(err, token) {});
```
Or you can set it directly with ngrok
```bash
./ngrok authtoken <token>
```

## connect
```javascript
var ngrok = require('ngrok');

ngrok.connect(function (err, url) {}); // https://757c1652.ngrok.io -> http://localhost:80
ngrok.connect(9090, function (err, url) {}); // https://757c1652.ngrok.io -> http://localhost:9090
ngrok.connect({proto: 'tcp', addr: 22}, function (err, url) {}); // tcp://0.tcp.ngrok.io:48590
ngrok.connect(opts, function(err, url) {});
```
First connect spawns the ngrok process so each next tunnel is created much faster.

## options
```javascript
ngrok.connect({
	proto: 'http', // http|tcp|tls
	addr: 8080, // port or network address
	auth: 'user:pwd', // http basic authentication for tunnel
	subdomain: 'alex', // reserved tunnel name https://alex.ngrok.io,
	authtoken: '12345' // your authtoken from ngrok.com
}, function (err, url) {});
```

Other options: `name, inspect, host_header, bind_tls, hostname, crt, key, client_cas, remote_addr` - read [here](https://ngrok.com/docs)

## disconnect
The ngrok and all tunnels will be killed when node process is done. To stop the tunnels use
```javascript
ngrok.disconnect(url); // stops one
ngrok.disconnect(); // stops all
ngrok.kill(); // kills ngrok process
```

## emitter
Also you can use ngrok as an event emitter, it fires "connect", "disconnect" and "error" events
```javascript
ngrok.once('connect', function (url) {};
ngrok.connect(port);
```

## configs
You can use ngrok's [configurations files](https://ngrok.com/docs#config), then just pass `name` option when making a tunnel. Configuration files allow to specify more options, eg ngrok region you want to use.
```
OS X	/Users/example/.ngrok2/ngrok.yml
Linux	/home/example/.ngrok2/ngrok.yml
Windows	C:\Users\example\.ngrok2\ngrok.yml
```

## inspector
When tunnel is established you can use the ngrok interface http://127.0.0.1:4040 to inspect the webhooks done via ngrok.

## how it works
npm install downloads ngrok binaries for you platform and puts them into bin folder. You can host binaries yourself and set NGROK_CDN_URL env var before installing ngrok.

First time you create tunnel ngrok process is spawned and runs until you disconnect or when parent process killed. All further tunnels are created or stopped by using internal ngrok api which usually runs on http://127.0.0.1:4040
