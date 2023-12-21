import {ContactInfo} from "./contact-info";

export class User {

  public static clone(user: User): User {
    return user;
  }

  constructor(
    public username: string,
    public password: string = '',
    public contactInfo: ContactInfo,
    public id?: string
  ) {}
}
