# The Aces Grocery Shopping Application


### Deployment

We need to set the config in `nginx` to the following contents:
```
server{
	charset utf-8;
	listen 80 default_server;
	server_name _;

	location / {
		root /home/ubuntu/front-end;
		try_files $uri /index.html;
	}

	location /api/ {
		proxy_pass http://localhost:4100/;
	}
}
```
