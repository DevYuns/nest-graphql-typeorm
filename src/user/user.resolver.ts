import {
  UpdateChildInfoOutput,
  UpdateChildInfoInput,
} from './dtos/update-child-info.dto';
import {
  AddSitterRoleOutput,
  AddSitterRoleInput,
} from './dtos/add-sitter-role.dto';
import {
  CreateAccountOfSitterInput,
  CreateAccountOfSitterOutput,
} from './dtos/create-account-of-sitter.dto';
import {
  CreateAccountOfParentInput,
  CreateAccountOfParentOutput,
  ChildrenInput,
} from './dtos/create-account-of-Parent.dto';
import { Role } from './../auth/role.decorator';
import {
  AddParentRoleInput,
  AddParentRoleOutput,
} from './dtos/add-parent-role.dto';
import {
  ChangePasswordOutput,
  ChangePasswordInput,
} from './dtos/change-password.dto';
import {
  UpdateProfileOutput,
  UpdateProfileInput,
} from './dtos/update-profile.dto';
import { UserProfileInput, UserProfileOutput } from './dtos/user-profile.dto';
import { AuthUser } from './../auth/auth-user.decorator';
import { LoginOutput, LoginInput } from './dtos/login.dto';
import { UserService } from './user.service';
import { User, UserRole } from './entities/user.entity';
import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => User)
  @Role(['Any'])
  me(@AuthUser() authUser: User) {
    return authUser;
  }

  @Query(() => UserProfileOutput)
  @Role(['Any'])
  async userProfile(
    @Args() userProfileInput: UserProfileInput,
  ): Promise<UserProfileOutput> {
    return this.userService.findById(userProfileInput.userId);
  }

  @Mutation(() => CreateAccountOfParentOutput)
  async createAccountOfParent(
    @Args('parent') createAccountOfParentInput: CreateAccountOfParentInput,
    @Args('childen') childrenInput: ChildrenInput,
  ): Promise<CreateAccountOfParentOutput> {
    return this.userService.createAccountOfParent(
      createAccountOfParentInput,
      childrenInput,
    );
  }

  @Mutation(() => CreateAccountOfSitterOutput)
  async createAccountOfSitter(
    @Args('sitter') createAccountOfSitterInput: CreateAccountOfSitterInput,
  ): Promise<CreateAccountOfSitterOutput> {
    return this.userService.createAccountOfSitter(createAccountOfSitterInput);
  }

  @Mutation(() => LoginOutput)
  async login(@Args('input') loginInput: LoginInput): Promise<LoginOutput> {
    return this.userService.login(loginInput);
  }

  @Mutation(() => UpdateProfileOutput)
  @Role(['Any'])
  async updateProfile(
    @AuthUser() authUser: User,
    @Args('input') editProfileInput: UpdateProfileInput,
  ): Promise<UpdateProfileOutput> {
    return this.userService.updateProfile(authUser.id, editProfileInput);
  }

  @Mutation(() => ChangePasswordOutput)
  @Role(['Any'])
  async changePassword(
    @AuthUser() authUser: User,
    @Args('input') { password }: ChangePasswordInput,
  ): Promise<ChangePasswordOutput> {
    return this.userService.changePassword(authUser.id, password);
  }

  @Mutation(() => AddParentRoleOutput)
  @Role([UserRole.SITTER])
  async addParentRole(
    @AuthUser() authUser: User,
    @Args('input') addParentRoleInput: AddParentRoleInput,
    @Args('childen') childrenInput: ChildrenInput,
  ): Promise<AddParentRoleOutput> {
    return this.userService.addParentRole(
      authUser.id,
      addParentRoleInput,
      childrenInput,
    );
  }

  @Mutation(() => AddSitterRoleOutput)
  @Role([UserRole.PARENT])
  async addSitterRole(
    @AuthUser() authUser: User,
    @Args('input') addSitterRoleInput: AddSitterRoleInput,
  ): Promise<AddSitterRoleOutput> {
    return this.userService.addSitterRole(authUser.id, addSitterRoleInput);
  }

  @Mutation(() => UpdateChildInfoOutput)
  @Role([UserRole.PARENT])
  async updateChildInfo(
    @AuthUser() authUser: User,
    @Args('input') updateChildInfoInput: UpdateChildInfoInput,
  ): Promise<UpdateChildInfoOutput> {
    return this.userService.updateChildInfo(authUser.id, updateChildInfoInput);
  }
}
