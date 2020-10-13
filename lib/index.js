"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const core = require("@actions/core");
const core_1 = require("@actions/core");
const fs = require("fs");
const run = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const version = core_1.getInput('version', { required: true });
        const gradlePath = core_1.getInput('gradleBuildPath', { required: true });
        console.log('👉 This version will be set in build.gradle: ' + version);
        fs.readFile(gradlePath, 'utf8', (err, data) => {
            let newGradleFile = data;
            newGradleFile = newGradleFile.replace(/(version(?:\s|=)*)(.*)/, 'version: ' + version);
            fs.writeFile(gradlePath, newGradleFile, (err) => __awaiter(void 0, void 0, void 0, function* () {
                if (err) {
                    core.error(err);
                    core.setFailed(err.message);
                }
                console.log('📋 Version in build.gradle has been changed.');
            }));
        });
    }
    catch (err) {
        core.error(err);
        core.setFailed(err.message);
    }
});
run();
