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

class ContactInfo {
  constructor(
    public phoneNumber: string,
    public firstName: string,
    public lastName: string,
    public email: string,
    public address: string,
    public postalCode: string
  ) {}
}
