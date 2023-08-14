import { randomBytes } from 'crypto';
import path from 'path';
import fs from 'fs/promises';

const generateKey = async () => {
    try {
        const envPath = path.join(process.cwd(), '.env');

        const envFile = await fs.readFile(envPath, 'utf-8', (err, data) => {
            if (err) throw err;
            return data;
        });

        if(envFile.includes('APP_KEY')) {
            console.log('Key already set')
            return
        }

        console.log('Generating key...');
        const key = randomBytes(32).toString('hex');

        // check if .env file exists
        

        // check if APP_KEY exists

        await fs.appendFile(envPath, `\n\nAPP_KEY="${key}"\n`);
        console.log('Key generated');
    
    } catch(error) {
        console.log('Error', error);
    }
}

generateKey();