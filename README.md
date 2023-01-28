npm i to download all the necessary packages

Create your own .env.local file and include "REACT_APP_BASE_URL" and set it equal to your own local host, mine is "http:/localhost:3500"

Run json-server in a seperate terminal and link data with the server with following command:

json-server --watch data/db.json --port 3500

then npm start the project

This whole blog project is inspired from Dave Gray's Youtube Redux, RTK Query tutorial.

I just took the initiative of designing it with MaterialUI and making a couple of changes
