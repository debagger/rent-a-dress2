import { UserInterface } from "../entity";
import { Exclude } from "class-transformer"
import { ApiProperty } from "@nestjs/swagger";
export class UpdateUserRequestDto implements UserInterface {
    @Exclude()id: number;
    @ApiProperty({description:"Username"}) username: string;
    @ApiProperty({description:"User e-mail"})email: string;
    @ApiProperty({description:"User role"})role: string;
    @Exclude() password: string;
}