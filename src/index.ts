import * as http from "http";
import * as express from "express";
import * as morgan from "morgan";
import * as cors from "cors";
import * as bodyParser from "body-parser";
import * as methodOverride from "method-override";

import TestController from "./controllers/TestController";
import WorkHomeCatchmentController from "./controllers/WorkHomeCatchmentController";
import OdDataController from "./controllers/OdDataController";

const app: any = express();
app.use(cors({
    allowedHeaders: ["Content-Type"],
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(methodOverride());
app.use(morgan("dev", {}));

app.post("/api/work-home-catchment", WorkHomeCatchmentController.post);

app.post("/api/od-data", OdDataController.post);
app.get("/api/od-data", OdDataController.get);

app.post("/api/test", TestController.post);
app.get("/api/test", TestController.get);


app.server = http.createServer(app);

app.server.listen(process.env.PORT || 3000, () => {
    console.log(`Started on port ${app.server.address().port}`);
});

export default app;
