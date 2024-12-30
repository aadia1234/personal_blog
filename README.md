# Personal Blog

### This is a GitHub repository of all the frontend and backend files for my website, [https://aadiananddeveloper05.com](https://aadiananddeveloper05.com)

## Steps to update the server-side code

### SSH into the remote machine
Go to AWS Console &rarr; EC2 &rarr; Instances
Then select the instance associated with the project
> In this case, I've named it "portfolio-frontend";

Then go to Connect &rarr; SSH-Client
Then follow the steps on this page
> You must have your local private key file. If you lost it you need to create a new one!


### Update frontend
Simply run the following to pull changes:

    git pull origin main


### Update backend

 1. First, kill gunicorn: 
	 `sudo pkill gunicorn`
 2. Then run the following in order:
	```
	sudo supervisorctl reread
	sudo supervisorctl update
	sudo supervisorctl status
	```
 3. If everything is working fine, then restart nginx and (optionally) portfolio:
	```
	sudo systemctl restart nginx
	sudo systemctl restart portfolio
	```






## Debugging issues with AWS

Use the following YouTube videos to potentially fix any problems with AWS, or to setup a new, but similar, project with AWS:

 - [How To Deploy React App To Aws EC2 || Step by Step Tutorial](https://www.youtube.com/watch?v=fi6isvRp1S8)
 - [How To Get Https For Website || Free SSL Certificate || Forever](https://www.youtube.com/watch?v=li1Spq8rdS0)
 - [Implement Amazon S3 Storage for Static and Media files in Django](https://www.youtube.com/watch?v=JQVQcNN0cXE)
 - [Set Up AWS S3 Bucket with Django for Static and Media Files](https://www.youtube.com/watch?v=Ko52pn1KXS0)
