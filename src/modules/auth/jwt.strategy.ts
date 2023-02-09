/*
 * @Date: 2023-01-17 15:05:29
 * @LastEditors: guantingting
 * @LastEditTime: 2023-01-17 15:07:55
 */
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { JWT_SECRET } from '../../constants';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        ExtractJwt.fromAuthHeaderAsBearerToken(),
        ExtractJwt.fromBodyField('Authorization'),
      ]),
      ignoreExpiration: false,
      secretOrKey: JWT_SECRET,
    });
  }
  validate(payload: any) {
    console.log(`JWT验证 - Step 4: 被守卫调用`);
    return payload;
  }
}
