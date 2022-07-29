import app from "./app";
import { AppDataSource } from "./data-source";
import { User } from "./entity/User";

const { APP_PORT = 8080 } = process.env;

AppDataSource.initialize()
  .then(async () => {
    console.log("Inserting a new user into the database...");
    const user = new User();
    user.firstName = "Doe";
    user.lastName = "Jane";
    user.age = 36;
    await AppDataSource.manager.save(user);
    console.log("Saved a new user with id: " + user.id);

    console.log("Loading users from the database...");
    const users = await AppDataSource.manager.find(User);
    console.log("Loaded users: ", users);

    app.listen(APP_PORT, () =>
      console.log(`Borgs-cube-server listening on port ${APP_PORT}!`)
    );
  })
  .catch((error) => console.log(error));
