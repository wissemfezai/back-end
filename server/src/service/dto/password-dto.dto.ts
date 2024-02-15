import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class PasswordDTO {
  @ApiProperty({ description: 'User login', required: true })
  @IsString()
  login: string;

  @ApiProperty({ description: 'User old password', required: true })
  @IsString()
  currentPassword: string;

  @ApiProperty({ description: 'User new password', required: true })
  @IsString()
  newPassword: string;
}
