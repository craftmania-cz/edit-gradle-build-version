import * as core from '@actions/core';
import { getInput } from "@actions/core";
import * as fs from "fs";

const run = async () => {
	try {
		const version = getInput('version', {required: true});
		const gradlePath = getInput('gradleBuildPath', {required: true});

		console.log('👉 This version will be set in build.gradle: ' + version);

		fs.readFile(gradlePath, 'utf8', (err, data) => {
			let newGradleFile: string = data;
			newGradleFile = newGradleFile.replace(/(version(?:\s|=)*)(.*)/, 'version: ' + version);
			fs.writeFile(gradlePath, newGradleFile, async (err) => {
				if (err) {
					core.error(err);
					core.setFailed(err.message);
				}
				console.log('📋 Version in build.gradle has been changed.')
			});
		});
	} catch (err: any) {
		core.error(err);
		core.setFailed(err.message);
	}
}

run();
