import chalk, { ChalkInstance } from 'chalk';

const logFn = (color: ChalkInstance, message: string) => {
	// eslint-disable-next-line no-console
	console.log(`  ${color('•')} ${message}`);
};

const log = {
	info: (message: string) => logFn(chalk.blue, message),
	error: (message: string) => logFn(chalk.red, message)
};

export default log;
