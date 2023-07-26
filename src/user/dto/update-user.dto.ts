import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto  {
    full_name: string;
    email: string;
    password: string;
    age: null;
    avatar: string

}
