import { IsNotEmpty, IsString, MinLength } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class FileUpdateDto {
  @ApiProperty({
    description: "Name of the file",
    example: "file.txt",
    minimum: 6,
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  name: string;
}
