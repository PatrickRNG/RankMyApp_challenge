# RankMyApp challenge

## How to run locally
1. Clone this repository  
`$ git clone https://github.com/PatrickRNG/RankMyApp_challenge`  
2. Configure environment variables - [configurations](#Configurations)
3. If you already have Docker installed, run:  
`$ docker-compose up --build`  
4. Go to http://localhost:3001/

## Configurations
Create a ".env" file in the root of the /server folder. Inside set the below env variables. (For testing purposes there is already a .env.example in this repository, just copy it).

**The environment variables**  
1. PORT -> Port for the web server
2. MONGO_URI -> Mongo URI for MongoDB configuration
3. CLIENT_ID -> ClientID for the smtp configuration
4. CLIENT_SECRET -> Secret of your Google Oauth
5. REDIRECT_URL -> Configuration for Google Oauth
6. REFRESH_TOKEN -> Configuration for Google Oauth

## TO DO
1. More tests!
2. Better way to control every E-mail sent by each alarm

**PS**  
The ClientId, ClientSecret and other Google/Auth information in here are just for testing purposes, specificaly for this test/challenge. You should generate your own SMTP and Google Oauth info.