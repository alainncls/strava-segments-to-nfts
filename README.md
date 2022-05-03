# Strava Segments to NFTs

[![Build](https://github.com/alainncls/strava-segments-to-nfts/actions/workflows/pipeline.yml/badge.svg)](https://github.com/alainncls/strava-segments-to-nfts/actions/workflows/pipeline.yml)

This project aims to generate an NFT for each new unique and eligible segment a Strava user runs through.

The corresponding web application is in
a [dedicated repository](https://github.com/alainncls/strava-segments-to-nfts-webapp).

## Blockchain part

[![Coverage Status](https://coveralls.io/repos/github/alainncls/strava-segments-to-nfts/badge.svg?branch=main)](https://coveralls.io/github/alainncls/strava-segments-to-nfts?branch=main)

## Web server part

[![Coverage](https://sonarcloud.io/api/project_badges/measure?project=alainncls_strava-segments-to-nfts&metric=coverage)](https://sonarcloud.io/summary/new_code?id=alainncls_strava-segments-to-nfts)
[![Maintainability Rating](https://sonarcloud.io/api/project_badges/measure?project=alainncls_strava-segments-to-nfts&metric=sqale_rating)](https://sonarcloud.io/summary/new_code?id=alainncls_strava-segments-to-nfts)

## How to launch

### Blockchain part

1. Go to the `blockchain` folder and run `npm install`
2. Start Ganache
3. Deploy the contract via `truffle migrate`
4. Generate the TypeScript interfaces for the contracts with `npm run types`

### Web server part

1. Stay at the root of the project and run `npm install`
2. Launch the server with `npm run start` (`npm run start:dev` for the watch mode)
3. The server runs on http://localhost:3001/

## How to test

### Blockchain part

1. Go to the `blockchain` folder and run `npm install`
2. Start Ganache
3. Test the contract with `truffle test`

### Web server part

1. Stay at the root of the project and run `npm install`
2. Unit test the server with `npm run test` (`npm run test:watch` for the watch mode and `npm run test:coverage` to
   generate the coverage data)
3. E2E test the server with `npm run test:e2e` (`npm run test:watch` for the watch mode and `npm run e2e:coverage` to
   generate the coverage data)

## Technical notes/ideas

### Backend

* Framework: [NestJS](https://docs.nestjs.com/)
* Database: MongoDB accessed _via_ [Mongoose](https://mongoosejs.com/docs/guide.html)
* Wrap Strava's API: [strava-v3](https://www.npmjs.com/package/strava-v3)
* Decode Strava's segment encoded polyline: [polyline-encoded](https://github.com/jieter/Leaflet.encoded)
* Generate an image: [canvas](https://github.com/Automattic/node-canvas) library,
  following [Sean Davis' blog post](https://blog.logrocket.com/creating-saving-images-node-canvas/)
* Draw polyline on a canvas: [StackOverflow](https://stackoverflow.com/a/44469353/7592456)

### Frontend

* Framework: [React](https://reactjs.org/)

### Blockchain

* [Create NFTs with JS](https://blog.logrocket.com/how-to-create-nfts-with-javascript/)

## Features ideas

### Basic stuff

* ✔️ Create a database of eligible segments
* ✔️ CRUD for these eligible segments
* ✔️ Get a Strava activity via its ID
* ✔️ Extract new segments IDs from this activity
* ✔️ For matching segments, generate a PNG (name, length)
* ✔️ Strava connect from the webapp

### Blockchain stuff

* 🚧 Make an NFT from this PNG
* ✔️ Upload image to IPFS

### Advanced stuff

* ❌ Create sets of segments, to make a complete collection of NFTs
* ❌ When a collection is completed, generate a "GOLD" NFT

## To Do

_Nothing at the moment_