import { IsInt, Min } from 'class-validator';

export class ChangeUserQuotaDto {
  @IsInt({ message: 'quota має бути цілим числом' })
  @Min(1, { message: 'quota має бути більше 0' })
  quota!: number;
}
