# URL Shortener Service

> API to create short urls using Node, Express and MongoDB

## Quick Start

```bash
# Install dependencies
npm install

# Edit the default.json file with your mongoURI and baseUrl
# Use production.json in production env

You need to connect MongoDb as well as make an index.html file for frontend 

You have the shortlinks and longurls in the api.http file inside requests folder

npm run dev
or
# Run
npm start
```

## Endpoint to create short url

### POST api/url/shorten

{ "longUrl": "xxxx" }
