import app from "./app";
import { AppDataSource } from "./data-source";

const { APP_PORT = 3000 } = process.env;

AppDataSource.initialize()
  .then(async () => {
    app.listen(APP_PORT, () =>
      console.log(`Sport Radar listening on port ${APP_PORT}!`)
    );
  })
  .catch((error) => console.log(error));
