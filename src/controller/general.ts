import { BaseContext } from 'koa';
import util from 'util';
import redis from 'redis';
import { redisConfig } from '../config/redis';

export default class GeneralController {
  public static async helloWorld(ctx: BaseContext) {
    ctx.body = 'Hello World 2';
  }

  public static async getKey(ctx: BaseContext) {
    const params = {
      host: redisConfig.host,
      port: redisConfig.port,
      db: redisConfig.db,
      prefix: redisConfig.prefix + ':',
    };
    if (redisConfig.password !== undefined && redisConfig.password.length > 0) {
      params['password'] = redisConfig.password;
    }

    const redisClient =  redis.createClient(params);
    const getAsync = util.promisify(redisClient.get).bind(redisClient);

    const key = 'myKey';
    try {
      const value = await getAsync(key);

      ctx.body = 'myKey value is : ' + JSON.parse(value);
    } catch (error) {
      console.log(error);

      ctx.body = error;
    }
  }

  public static async setKey(ctx: BaseContext) {
    const params = {
      host: redisConfig.host,
      port: redisConfig.port,
      db: redisConfig.db,
      prefix: redisConfig.prefix + ':',
    };
    if (redisConfig.password !== undefined && redisConfig.password.length > 0) {
      params['password'] = redisConfig.password;
    }
    const redisClient = redis.createClient(params);
    const setAsync = util.promisify(redisClient.set).bind(redisClient);

    const key = 'myKey';
    const value = 'abc';
    try {
      await setAsync(key, JSON.stringify(value), 'EX', 60);

      ctx.body = 'The value is available until 60 seconds';
    } catch (error) {
      console.log(error);

      ctx.body = error;
    }
  }
}
