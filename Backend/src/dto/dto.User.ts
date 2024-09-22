import { IsOptional, IsStrongPassword } from "class-validator";
export class Add {
  email: string;
  username: string;
  password: string;

  @IsOptional()
  pfp_url: string;
}

export class Update {
  @IsOptional()
  username: string;

  @IsOptional()
  @IsStrongPassword()
  password: string;

  @IsOptional()
  pfp_url: string;
}

export class Get {
  @IsOptional()
  email: string;

  @IsOptional()
  password: string;
}
