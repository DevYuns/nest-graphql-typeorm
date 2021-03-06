import { CONFIG_OPTIONS } from './../common/common.constants';
import { JwtModuleOptions } from './jwt.interfaces';
import * as jwt from 'jsonwebtoken';
import { Injectable, Inject } from '@nestjs/common';

@Injectable()
export class JwtService {
  constructor(
    @Inject(CONFIG_OPTIONS) private readonly options: JwtModuleOptions,
  ) {}

  sign(payload: Record<string, unknown>): string {
    return jwt.sign(payload, this.options.secretKey);
  }

  verify(token: string) {
    return jwt.verify(token, this.options.secretKey);
  }
}
