import { Request, Response } from 'express';
import * as fs from 'fs';
import sharp from 'sharp';

interface Query {
  filename: string;
  width: string;
  height: string;
}
const processImage = async (
  filename: string,
  width: string,
  height: string
) => {
  const Image = await sharp(`./full/${filename}.jpg`)
    .resize(parseInt(width), parseInt(height))
    .toFile(`${filename}${width}x${height}.jpg`);

  return Image;
};

const readImage = async (req: Request, res: Response) => {
  const { filename, width, height } = req.query as unknown as Query;
  await fs.readFile(`${filename}${width}x${height}.jpg`, function (err, data) {
    if (err) throw err; // Fail if the file can't be read.
    res.writeHead(200, { 'Content-Type': 'image/jpg' });
    res.end(data); // Send the file data to the browser.
  });
};

const isExist = async (req: Request, res: Response) => {
  const { filename, width, height } = req.query as unknown as Query;

  console.log('check step');
  if (fs.existsSync(`./${filename}${width}x${height}.jpg`)) {
    console.log('done lol mawgod');
    await readImage(req, res);
  } else {
    console.log('la2 msh hena');
    await processImage(filename, width, height);
    await console.log('reesized');
    await readImage(req, res);
    console.log(res.statusCode);
  }
};

export { isExist, processImage };
// https://tqtoz.sse.codesandbox.io/api/images?filename=palmtunnel&width=600&height=400
