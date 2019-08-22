# PFAC-Demo
A sample PFAC demo App using the First Data Marketplace APIs

## What is PFAC-Demo?
The PFAC-Demo is a demo site that uses FirstData's Marketplace APIs (in a sandbox environment) and gives developers an idea of how to consume various first data API's, specifically, the ones that PFAC needs.  PFAC-Demo is written using express and react.

## How do I get started?
You can clone this repo and install the dependencies via the following commands:

### Update credentials file

Add a file called credentials.json inside your project at the same level, where server.js is. Update it with the credentials received from https://developer.firstdata.com site as below:

```
{
 "dev" : {
     "kongUrl" : "API_URL",
     "username" :  "API_username",
     "secret" : "API_secret"
 }
}
```

Then run:

```
npm install
npm start
```

Now you can visit localhost:3000 to view the site.

Also, the backend express server runs in port 8080, which is a proxy that directly connects to firstdata API's. To start the express server run the command below in a separate terminal inside project path:

```
node server.js
```

