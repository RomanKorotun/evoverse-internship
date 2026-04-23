import { IsEmail, IsInt, IsNotEmpty, Matches, Min } from 'class-validator';

import { PASSWORD_REGEX } from '../../../../common/constants/regex.constants';

export class CreateUserDto {
  @IsNotEmpty({ message: 'Поле email не може бути пустим' })
  @IsEmail({}, { message: 'Поле email містить не вірний формат' })
  email!: string;

  @IsNotEmpty({ message: 'Поле password не може бути пустим' })
  @Matches(PASSWORD_REGEX, {
    message:
      'Поле password повинно містити мінімум 6 символів, принаймні одну цифру та одну велику літеру',
  })
  password!: string;

  @IsInt({ message: 'quota має бути цілим числом' })
  @Min(1, { message: 'quota має бути більше 0' })
  quota!: number;
}
