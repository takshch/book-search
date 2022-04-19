# Book Search
App is built 2 times with 2 different Tech Stack
1. Ember.js + Firestore
2. React.js + DynamoDB

# AWS Deployment
Ember.js + Firestore app is deployed on EC2 instance with CodePipeline and AWS CodeDeploy

React.js + Node.js was deployed on EC2 but Google OAuth was not working on EC2 instance IP address and does not ip address as authorized domain.

But Firebase authentication supports IP address origin as authorized origin.


## React.js + Node.js

# Ember.js + Firestore

## Run Ember.js app locally
```cmd
cd "/Ember.js + Firebase/client"
npm install
npm rebuild node-sass
ember s
```

## Deploy firebase rules
```cmd
cd "/Ember.js + Firebase/firebase"
firebase login
firebase use {project_name}
firebase deploy --only firestore
```

# React.js + Node.js

## Run React.js app locally
```cmd
cd "/React.js + Node.js/client"
npm install
npm start
```

## Run Express.js backend locally
**Setup DynamoDB locally and make sure it is working on 8000**

Install instructions of Dynamo DB local
https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/DynamoDBLocal.DownloadingAndRunning.html

After starting Dynamo DB Local,

```cmd
cd "/React.js + Node.js/backend"
npm install
npm run dev
```

## Deployment Failure
**Sign in with Google was not working on AWS Public IP v4**.

Google OAuth authorized domains only support domain name not ip address.

So, Sign with Google's screen opened from AWS EC2 IP v4 throws error "unauthorized origin"
