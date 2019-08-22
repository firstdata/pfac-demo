# PFAC-Demo
A sample PFAC demo App using the First Data Marketplace APIs

## What is PFAC-Demo?
The PFAC-Demo is a demo site that uses FirstData's Marketplace APIs (in a sandbox environment) and gives developers an idea of how to consume various first data API's, specifically, the ones that PFAC needs.  PFAC-Demo is written using express and react.

## How do I get started?
You can clone this repo and install the dependencies via the following commands:

### Update configuration file

Update config/default.json file. Use credentials received from the https://developer.firstdata.com site:
```
{
  "kong": {
    "url": "API_URL",
    "username": "API_USERNAME",
    "secret": "API_SECRET"
  }
}
```

Then run:

```
npm install
npm start
```

Now you can visit localhost:3000 to view the site.

Also, to start the express server run:

```
node server.js
```

