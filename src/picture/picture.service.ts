import { Injectable } from '@nestjs/common';
import { createCanvas, loadImage } from 'canvas';
import * as PolylineUtil from 'polyline-encoded';

@Injectable()
export class PictureService {
  private static computeDistance(distance: number): string {
    return Math.abs(distance) > 999
      ? (Math.abs(distance) / 1000).toFixed(1) + 'km'
      : Math.abs(distance).toFixed(0) + 'm';
  }

  private static isKnownType(type: string): boolean {
    const defaultTypes = ['Ride', 'AlpineSki'];
    return defaultTypes.includes(type);
  }

  async generatePictureFromSegment(segmentPromise: Promise<any>): Promise<any> {
    const segment = await segmentPromise;

    const segmentLight = {
      title: segment.name,
      distance: PictureService.computeDistance(segment.distance),
      type: PictureService.isKnownType(segment.activity_type) ? segment.activity_type : 'default',
      polyline: PolylineUtil.decode(segment.map.polyline),
    };

    // Inspired by https://blog.logrocket.com/creating-saving-images-node-canvas/
    const titleText = this.formatTitle(segmentLight.title);

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

    context.font = "bold 70pt 'Sans'";
    context.textAlign = 'center';
    context.fillStyle = '#fff';

    context.fillText(titleText[0], 960, titleY);

    if (titleText[1]) {
      context.fillText(titleText[1], 960, titleY + titleLineHeight);
    }

    context.font = "40pt 'Sans'";
    context.fillText(`Distance: ${segmentLight.distance}`, 960, lengthY);

    /* Start 'Draw segment shape' */

    let minx, miny, maxx, maxy;
    miny = minx = Infinity;
    maxx = maxy = -Infinity;
    segmentLight.polyline.forEach((dat) => {
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
    segmentLight.polyline.forEach((dat) => {
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

    return loadImage(`./assets/${segmentLight.type}.png`).then((image) => {
      const { w, h, x, y } = imagePosition;
      context.drawImage(image, x, y, w, h);

      return canvas.toBuffer();
    });
  }

  private formatTitle(title: string): string {
    let output;
    // If the title is 80 characters or longer, look to add ellipses at the end of the second line
    if (title.length >= 80) {
      const firstLine = this.getMaxNextLine(title);
      const secondLine = this.getMaxNextLine(firstLine.remainingChars);
      output = [firstLine.line];
      let fmSecondLine = secondLine.line;
      if (secondLine.remainingChars.length > 0) fmSecondLine += ' ...';
      output.push(fmSecondLine);
    }
    // If 40 characters or longer, add the entire second line, using a max of half the characters, making the first line always slightly shorter than the second
    else if (title.length >= 40) {
      const firstLine = this.getMaxNextLine(title, title.length / 2);
      output = [firstLine.line, firstLine.remainingChars];
    }
    // Otherwise, return the short title
    else {
      output = [title];
    }

    return output;
  }

  private getMaxNextLine(input, maxChars = 20) {
    // Split the string into an array of words
    const allWords = input.split(' ');
    // Find the index in the words array at which we should stop, or we will exceed maximum characters
    const lineIndex = allWords.reduce((prev, cur, index) => {
      if (prev?.done) return prev;
      const endLastWord = prev?.position || 0;
      const position = endLastWord + 1 + cur.length;
      return position >= maxChars ? { done: true, index } : { position, index };
    });
    // Using the index, build a string for this line
    const line = allWords.slice(0, lineIndex.index).join(' ');
    // And determine what's left
    const remainingChars = allWords.slice(lineIndex.index).join(' ');
    // Return the result
    return { line, remainingChars };
  }
}
