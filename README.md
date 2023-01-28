npm i to download all the necessary packages
Create your own .env.local file and include "REACT_APP_BASE_URL" and set it equal to your own local host "http:/localhost:3500"
Run json-server in a seperate terminal and link data with the server as follows:
json-server --watch data/db.json --port 3500
then npm start the project

This whole blog project is taken from Dave Gray's RTK Query tutorial on YouTube.
But I took the initiative and went a little further by designing it with MaterialUI
