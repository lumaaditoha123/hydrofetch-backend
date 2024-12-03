import express, { Request, Response } from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

let data = {
  count: {
    waterDispense: 0,
    ballReturn: 0,
  },
  isLaunch: false,
  isWaterDispensed: false,
  isFoodDispensed: false,
};

app.get("/", (_: Request, response: Response) => {
  response.status(200).send("Hello API from /");
});

app.post("/hydrofetch/launch", (_: Request, response: Response) => {
  data = {
    ...data,
    isLaunch: !data.isLaunch,
  };

  response.status(200).send("ok");
});

app.post("/hydrofetch/dispense_water", (_: Request, response: Response) => {
  data = {
    ...data,
    count: {
      ...data.count,
      waterDispense: data.count.waterDispense + 1,
    },
    isWaterDispensed: !data.isWaterDispensed,
  };
  response.status(200).send("ok");
});

app.post("/hydrofetch/dispense_food", (_: Request, response: Response) => {
  data = {
    ...data,
    isFoodDispensed: !data.isFoodDispensed,
  };
  response.status(200).send("ok");
});

app.post("/hydrofetch/ball_return", (request: Request, response: Response) => {
  const { ball_returned } = request.body;

  if (ball_returned > 0)
    data = {
      ...data,
      count: {
        ...data.count,
        ballReturn: data.count.ballReturn + 1,
      },
    };

  response.status(200).send("ok");
});

app.post("/hydrofetch/revertDeviceState", (_: Request, response: Response) => {
  data = {
    ...data,
    isLaunch: false,
    isWaterDispensed: false,
    isFoodDispensed: false,
  };

  response.status(200).send("ok");
});

app.get(
  "/hydrofetch/getDeviceState",
  (request: Request, response: Response) => {
    response.status(200).send(data);
  }
);

app.listen(5174, () => {
  console.log("Server is running on port 5174");
});

export default app;
