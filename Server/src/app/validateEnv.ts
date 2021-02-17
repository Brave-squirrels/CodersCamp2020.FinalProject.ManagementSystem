import {cleanEnv, str} from 'envalid';

export default function validateEnv(){
    cleanEnv(process.env, {
        MONGO_PASSWORD: str(),
        MONGO_DB_NAME: str(),
        MONGO_USER: str()
    });
}