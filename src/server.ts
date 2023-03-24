import dotenv from 'dotenv';
dotenv.config({ path: '.env' });

import Koa from 'koa';
import { router } from './config/routes';
const app = new Koa();
app.proxy = true;

app.use(router.routes()).use(router.allowedMethods());

app.listen(8080);
console.log(`Server running on port 8080`);
