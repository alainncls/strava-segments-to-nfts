import {Injectable} from '@nestjs/common';
import strava from 'strava-v3';
import {createCanvas, loadImage} from 'canvas';
import {formatTitle} from './utils/format-title';
import * as PolylineUtil from 'polyline-encoded';
import fs from 'fs';

@Injectable()
export class PictureService {

    async generatePictureFromSegment(stravaId: number): Promise<any> {
        // FIXME: really temporary!
        const stravaApi = new strava.client('XXX');
        const segment = await stravaApi.segments.get({id: stravaId});

        const segmentLight = {
            title: segment.name,
            distance: PictureService.computeDistance(segment.distance),
            type: PictureService.isKnownType(segment.activity_type) ? segment.activity_type : 'default',
            polyline: PolylineUtil.decode(segment.map.polyline)
        };
        
        // Inspired by https://blog.logrocket.com/creating-saving-images-node-canvas/
        const titleText = formatTitle(segmentLight.title);

        const width = 1920;
        const height = 1080;
        const imagePosition = {
            w: 100,
            h: 100,
            x: 910,
            // Calculate the Y of the image based on the number of lines in the title
            y: titleText.length === 2 ? 120 : 160,
        };
        // Do the same with the title's Y value
        const titleY = titleText.length === 2 ? 480 : 560;
        const titleLineHeight = 100;
        // And the length's Y value
        const lengthY = titleText.length === 2 ? 840 : 800;

        const canvas = createCanvas(width, height);
        const context = canvas.getContext('2d');

        context.fillStyle = '#204077';
        context.fillRect(0, 0, width, height);

        context.font = 'bold 70pt \'Sans\'';
        context.textAlign = 'center';
        context.fillStyle = '#fff';

        context.fillText(titleText[0], 960, titleY);

        if (titleText[1]) {
            context.fillText(titleText[1], 960, titleY + titleLineHeight);
        }

        context.font = '40pt \'Sans\'';
        context.fillText(`Distance: ${segmentLight.distance}`, 960, lengthY);

        /* Start 'Draw segment shape' */

        let minx, miny, maxx, maxy;
        miny = minx = Infinity
        maxx = maxy = -Infinity;
        segmentLight.polyline.forEach(dat => {
            minx = Math.min(minx, dat[0]);
            miny = Math.min(miny, dat[1]);
            maxx = Math.max(maxx, dat[0]);
            maxy = Math.max(maxy, dat[1]);
        });

        const rangeX = maxx - minx;
        const rangeY = maxy - miny;
        const range = Math.max(rangeX, rangeY);
        const scale = Math.min(width, height);

        context.beginPath();
        segmentLight.polyline.forEach(dat => {
            let x = dat[0];
            let y = dat[1];
            x = ((x - minx) / range) * scale;
            y = ((y - miny) / range) * scale;
            context.lineTo(x, y);
        });
        context.strokeStyle = '#ffffff';
        context.lineWidth = 2;
        context.stroke();

        /* End 'Draw segment shape' */

        loadImage(`./assets/${segmentLight.type}.png`).then((image) => {
            const {w, h, x, y} = imagePosition;
            context.drawImage(image, x, y, w, h);

            const buffer = canvas.toBuffer('image/png');
            fs.writeFileSync(`./${segment.name}.png`, buffer);
        });
    }

    private static computeDistance(distance: number): string {
        return Math.abs(distance) > 999 ? (Math.abs(distance) / 1000).toFixed(1) + 'km' : Math.abs(distance).toFixed(0) + 'm'
    }

    private static isKnownType(type: string): boolean {
        const defaultTypes = ['Ride', 'AlpineSki'];
        return defaultTypes.includes(type);
    }
}
