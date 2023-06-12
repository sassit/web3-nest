# NestJS + Web3.js

REST API that interacts with a eth provider using web3.js

## Instructions

1. Change .env tokens
2. npm start 

## Available endpoints

Endpoints are avalaible via: `localhost:3001/api`
MongoDB is available at: `mongodb://localhost/vote`

## MongoDB installation

https://www.mongodb.com/docs/manual/installation/

## IPFS file upload [minting of nft not working yet]
curl -iv --form image=@./test.png data=@./test.json http://localhost:3001/ipfs/upload

This works but it needs an additional attribute with metadata.

The file can be retrieved via: https://ipfs.io/ipfs/<cid>