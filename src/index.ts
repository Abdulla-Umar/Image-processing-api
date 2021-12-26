import express from "express";
import { router } from "./routes/imageRouter.js";
import { Request, Response } from "express";

const app = express();
const port = 6000;

app.get("/", (req: Request, res: Response) => {
  res.send("hello");
});

app.use("/api", router);

app.listen(port, (): void => {
  console.log(`server running on port: ${port}`);
});

export default app;
