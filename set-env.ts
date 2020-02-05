import * as fs from 'fs';
import { resolve } from "path";
import { config } from "dotenv";

import * as handlebars from 'handlebars';

const buildEnvPath = resolve(__dirname, "build.env");

fs.access(buildEnvPath, (err) => {
    if (err) {

        const buildEnvMessage = "build.env file not found in root of project directory. \n"
                                +"In you local dev environment execute npm run gen-build-env:local and then update property values accordingly \n"
                                +"In CI execute \"npm run gen-build-env <Dev | QA | PROD>\" before npm run build to generate the build.env file, "
                                ;
        console.log(buildEnvMessage);

        process.exitCode = 1;
    } else {

        //Process build.env file
        console.log('Found build.env - Configuring environment');
        const envResult = config({ path: buildEnvPath});

        const { parsed: envVars } = envResult;

        const templateFile = fs.readFileSync('angular.json.template').toString();

        const template = handlebars.compile(templateFile);
    
        const genFileContents = template(process.env);

        fs.writeFileSync('angular.json', genFileContents);
        console.log("angular.json generated successfully \n\n");

    }

});




