import { CredentialsSignin } from "next-auth";

export class CustomError extends CredentialsSignin {
  code: string;
  message: string;

  constructor(code: string, message: string) {
    super();
    this.code = code;
    this.message = message;
  }
}
