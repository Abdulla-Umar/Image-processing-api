import express from "express";
import { router } from "./routes/imageRouter.js";
import { Request, Response } from "express";

const app = express();

app.get("/", (req: Request, res: Response): void => {
  res.send("hello");
});

app.use("/api", router);

app.listen(3000, (): void => {
  console.log(`server running on port: 3000`);
});

export default app;
