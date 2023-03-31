const { mainMenu, splashScreen } = require("./helper");

const runCLI = async () => {
  await splashScreen();
  await mainMenu();
};

runCLI();
