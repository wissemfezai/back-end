import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class PasswordResetDTO {

  @ApiProperty({ description: 'User login', required: true })
  @IsString()
  login: string;

  @ApiProperty({ description: 'User email', required: true })
  @IsString()
  email: string;

  @ApiProperty({ description: 'User reset key' })
  @IsString()
  resetKey?: string;

  @ApiProperty({ description: 'User new password' })
  @IsString()
  newPassword?: string;
}
