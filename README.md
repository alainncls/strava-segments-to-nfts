# Strava Segments to NFTs

[![Build](https://github.com/alainncls/strava-segments-to-nfts/actions/workflows/tests.yml/badge.svg)](https://github.com/alainncls/strava-segments-to-nfts/actions/workflows/tests.yml)
[![Coverage](https://sonarcloud.io/api/project_badges/measure?project=alainncls_strava-segments-to-nfts&metric=coverage)](https://sonarcloud.io/summary/new_code?id=alainncls_strava-segments-to-nfts)
[![Maintainability Rating](https://sonarcloud.io/api/project_badges/measure?project=alainncls_strava-segments-to-nfts&metric=sqale_rating)](https://sonarcloud.io/summary/new_code?id=alainncls_strava-segments-to-nfts)

Contract: [![Coverage Status](https://coveralls.io/repos/github/alainncls/strava-segments-to-nfts/badge.svg?branch=main)](https://coveralls.io/github/alainncls/strava-segments-to-nfts?branch=main)

This project aims to generate an NFT for each new unique and eligible segment a Strava user runs through.

## How to launch

### 1. Start MongoDB

    docker-compose up -d

### 2. Generate the TypeScript interface for the contract

    npm run types

### 3. Start the service

    npm run start

### 3.bis Start the service in development mode (watch)

    npm run start:dev

## How to test

### Run unit tests

    npm run test

### Run unit tests with watch

    npm run test:watch

### Run unit tests with coverage

    npm run test:coverage

### Run end-to-end tests

    npm run test:e2e

### Run end-to-end tests with watch

    npm run test:e2e:watch

### Run end-to-end tests with coverage

    npm run test:e2e:coverage

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
