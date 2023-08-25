import { ApiProperty } from "@nestjs/swagger";

export class CreateAuthDto {
    @ApiProperty({description: "fullname", type: String})
    full_name: string

    @ApiProperty({description: "email", type: String})
    email: string
}
