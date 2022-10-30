import { IsEnum, IsNotEmpty } from 'class-validator';
import { StatusEnum } from 'src/types/status.enum';

export class UpdateStatusDto {
  @IsNotEmpty()
  @IsEnum(StatusEnum)
  status: StatusEnum;
}
