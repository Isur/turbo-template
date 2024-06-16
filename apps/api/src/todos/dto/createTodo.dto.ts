import { IsNotEmpty, IsString, MinLength } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateTodoDto {
  @ApiProperty({
    description: "The title of the todo item",
    example: "Buy bananas",
    minimum: 3,
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  title: string;
}
