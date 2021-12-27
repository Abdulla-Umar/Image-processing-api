import { Request, Response } from 'express';
import * as fs from 'fs';
import sharp from 'sharp';

interface Query {
  filename: string;
  width: string;
  height: string;
}
interface ImageObject {
  width: number,
  height: number,
  format: string,
  channels: number,
  premultiplied: boolean,
  size: number
}
const processImage = async (
  filename: string,
  width: string,
  height: string
):Promise<ImageObject> => {
  const Image = await sharp(`./full/${filename}.jpg`)
    .resize(parseInt(width), parseInt(height))
    .toFile(`${filename}${width}x${height}.jpg`);

  return Image;
};

const readImage = async (req: Request, res: Response):Promise<void>=> {
  const { filename, width, height } = req.query as unknown as Query;
  await fs.readFile(`${filename}${width}x${height}.jpg`, function (err, data) {
    if (err) throw err; // Fail if the file can't be read.
    res.writeHead(200, { 'Content-Type': 'image/jpg' });
    res.end(data); // Send the file data to the browser.
  });
};

const isExist = async (req: Request, res: Response):Promise<void>=> {
  const { filename, width, height } = req.query as unknown as Query;
  if (fs.existsSync(`./${filename}${width}x${height}.jpg`)) {
    await readImage(req, res);
  } else {
    await processImage(filename, width, height);
    await readImage(req, res);
  }
};

export { isExist, processImage };
// https://tqtoz.sse.codesandbox.io/api/images?filename=palmtunnel&width=600&height=400
