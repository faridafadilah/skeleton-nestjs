import * as dotenv from 'dotenv';

dotenv.config();

export const jwtSecret = process.env.JWT_SECRET
export const expireIn = process.env.JWT_EXPIRES_IN