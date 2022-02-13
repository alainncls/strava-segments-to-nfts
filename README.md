# Strava Segments to NFTs

[![Build](https://github.com/alainncls/strava-segments-to-nfts/actions/workflows/tests.yml/badge.svg)](https://github.com/alainncls/strava-segments-to-nfts/actions/workflows/tests.yml)
[![Coverage](https://sonarcloud.io/api/project_badges/measure?project=alainncls_strava-segments-to-nfts&metric=coverage)](https://sonarcloud.io/summary/new_code?id=alainncls_strava-segments-to-nfts)
[![Maintainability Rating](https://sonarcloud.io/api/project_badges/measure?project=alainncls_strava-segments-to-nfts&metric=sqale_rating)](https://sonarcloud.io/summary/new_code?id=alainncls_strava-segments-to-nfts)

This project aims to generate an NFT for each new unique and eligible segment a Strava user runs through.

## How to launch

### Start MongoDB

    docker-compose up -d

### Start the service

    npm run start

### Start the service in development mode (watch)

    npm run start:dev

### Run tests

    npm run test

### Run tests with watch

    npm run test:watch

## Technical notes

### Backend

* [NestJS](https://docs.nestjs.com/)
* Database: MongoDB
* (ideas) Decode Strava's segment encoded polyline:
    * [Leaflet](https://leafletjs.com/)
    * [Mapbox](https://github.com/mapbox/polyline)
    * [Google's Geometry library](https://developers.google.com/maps/documentation/javascript/geometry)
* (notes) Convert Strava polyline to an image:
    * https://www.markhneedham.com/blog/2017/04/29/leaflet-strava-polylines-osm/
    * https://developers.google.com/maps/documentation/utilities/polylineutility
    * https://github.com/jieter/Leaflet.encoded
    * https://www.w3schools.com/graphics/svg_polyline.asp

### Frontend

* React?
* Implement Strava's OAuth2 flow: https://github.com/simov/grant

### Strava API interaction

* Use [strava-v3](https://www.npmjs.com/package/strava-v3)
* [getActivityById](https://developers.strava.com/docs/reference/#api-Activities-getActivityById)
* [getSegmentById](https://developers.strava.com/docs/reference/#api-Segments-getSegmentById)

## Features ideas

### Basic stuff

* ✔️ Create a database of eligible segments
* ✔️ CRUD for these eligible segments
* 🚧 Get a Strava activity via its ID (need to connect from a webapp to get a token)
* ✔️ Extract new segments IDs from this activity
* ❌ For matching segments, generate a PNG (name, length)
* ❌ Strava connect from the webapp

### Blockchain stuff

* ❌ Make an NFT from this PNG

### Advanced stuff

* ❌ Create sets of segments, to make a complete collection of NFTs
* ❌ When a collection is completed, generate a "GOLD" NFT

## To Do

* Test Repositories: https://stackoverflow.com/a/67050072/7592456
* Add e2e tests: https://docs.nestjs.com/fundamentals/testing#end-to-end-testing