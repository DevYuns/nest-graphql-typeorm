import { CoreOutput } from './../../common/dtos/output.dto';
import { User } from './../entities/user.entity';
import { PickType, ObjectType, InputType } from '@nestjs/graphql';

@InputType()
export class CreateAccountInput extends PickType(User, [
  'birthday',
  'email',
  'name',
  'password',
  'roles',
  'sex',
  'accountId',
]) {}

@ObjectType()
export class CreateAccountOutput extends CoreOutput {}
