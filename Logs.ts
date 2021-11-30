// Chalk console logs colors
import chalk from "chalk";

export const logWarning = (msg: String) => console.log(chalk.bgYellow(msg));

export const logSuccess = (msg: String) =>
  console.log(chalk.black.bgGreen(msg));

export const logInfo = (msg: String) =>
  console.log(chalk.black.bgBlue.black(msg));
  
export const logError = (msg: String) =>
  console.log(chalk.yellowBright.bgRedBright(msg));
