import { readFileSync } from "jsonfile";
import { join } from "path";

const envFile = join(__dirname, '..', 'config-variables', 'env', 'env.json');
const envVars = readFileSync(envFile);

export const apiKey = envVars['API_KEY'];