import fsp from 'fs/promises';
import path from 'path';

import { WindowsSignTaskConfiguration } from 'electron-builder';
import env, { EnvVarError } from 'env-var';
import SignoClient from 'signo-client';

import log from './log.js';

const sign = async (signTask: WindowsSignTaskConfiguration) => {
	log.info(`Signing ${path.basename(signTask.path)} with ${signTask.hash}`);

	const config = {
		server: '',
		signee: 0,
		secret: '',
		engine: 0
	};

	try {
		config.server = env.get('SIGNO_SERVER').required().asUrlString();
		config.signee = env.get('SIGNO_SIGNEE').required().asIntPositive();
		config.secret = env.get('SIGNO_SECRET').required().asString();
		config.engine = env.get('SIGNO_ENGINE').required().asIntPositive();
	} catch (e: any) {
		if (e instanceof EnvVarError) {
			log.error(`Configuration error: ${e.message}`);
		}
		throw new Error('Signo configuration error');
	}

	const signer = new SignoClient(config);

	try {
		const file = await fsp.readFile(signTask.path);
		const signed = await signer.sign(file);
		await fsp.writeFile(signTask.path, signed);
	} catch (e: any) {
		log.error(`Failed to sign executable: ${e.message}`);
		throw new Error('Failed to sign executable');
	}
};

export default sign;
