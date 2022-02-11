# Strava Segments to NFTs

This project aims to generate an NFT for each new unique segment a Strava user runs through.

## How to launch

### Start MongoDB

    docker-compose up -d

### Start the service

    npm run start

### Start the service in development mode (watch)

    npm run start:dev

### Run tests

_In progress_

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

### Strava API interaction

* Use [strava-v3](https://www.npmjs.com/package/strava-v3)
* [getActivityById](https://developers.strava.com/docs/reference/#api-Activities-getActivityById)
* [getSegmentById](https://developers.strava.com/docs/reference/#api-Segments-getSegmentById)

## Features ideas

### Basic stuff

* ✔️ Create a database of eligible segments
* ✔️ CRUD for these eligible segments
* ❌ Get a Strava activity via its ID
* ❌ Extract new segments ID from this activity
* ❌ For matching segments, generate a PNG (name, length)

### Blockchain stuff

* ❌ Make an NFT from this PNG

### Advanced stuff

* ❌ Create sets of segments, to make a complete collection of NFTs
* ❌ When a collection is completed, generate a "GOLD" NFT

## To Do

* Add a `SegmentRepository` to decouple the service and the DB access
* Tests for `SegmentService`
* GitHub Actions configuration
* SonarQube analysis