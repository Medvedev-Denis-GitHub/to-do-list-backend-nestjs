import { ApiProperty } from '@nestjs/swagger';

export class AuthResponseDto {
  @ApiProperty({
    type: String,
    description: 'JWT токен пользователя',
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOnsidXNlcklkIjoiZDkwMDczM2EtNDhjMS00MDkyLTlmNmItYzRmYjhkOWVkOGY5In0sInVzZXJuYW1lIjoidXNlcm5hbWVEZXYxIiwiaWF0IjoxNzA3ODIyMzkzLCJleHAiOjE3MDc5MDg3OTN9.YfYSfgDDd-QtKnIzms4lp2pCZGhUmzWCB8e9mYM7vxs',
  })
  access_token: string;
}
