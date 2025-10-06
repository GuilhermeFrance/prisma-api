import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ description: 'Email do usuário' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: 'Nome completo do usuário' })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Define se o usuário é administrador',
    default: false,
  })
  @IsBoolean()
  admin: boolean;
}
