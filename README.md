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

## IPFS file upload [minting of nft working but probably has issues, cannot see nft in metamask, but onchain and in ipfs]
curl -F image=@./test.png -F nftName=Hello -F nftDescription=Test -F address=0x63Ec8bcF66479CE5844Eb8cb5147C9D1CC448B95  http://localhost:3001/ipfs/upload

This works but it needs an additional attribute with metadata.

The file can be retrieved via: https://ipfs.io/ipfs/<cid> (you can see the ipfs url in the metadata on-chain or console.log)