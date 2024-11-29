import { IsNotEmpty, IsString, MinLength } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class FileUpdateDto {
  @ApiProperty({
    description: "Name of the file",
    example: "file.txt",
    minimum: 2,
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  name: string;
}
