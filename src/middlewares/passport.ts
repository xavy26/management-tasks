import { Strategy, ExtractJwt, StrategyOptions } from "passport-jwt";
import { AppDataSource } from "../database/data-source"
import { User } from "../entities/user_entity"
import config from "../config/config";

const opts: StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.jwtSecret
}

const userRepository = AppDataSource.getRepository(User);

export default new Strategy(opts, async (payload, done) => {
  try {
    const id = payload.id;
    const user = await userRepository.findOne({ where: { id: id } });
    if (user) {
      return done(null, user);
    }
    return done(null, false);
  } catch (err) {
    console.error(err);
  }
});