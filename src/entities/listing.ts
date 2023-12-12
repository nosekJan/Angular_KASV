import {ContactInfo} from "./contact-info";

export class Listing {
  constructor(
    public sellerId: string,
    public title: string,
    public description: string,
    public price: number,
    public imageId: string,
    public contactInfo: ContactInfo
  ) {}
}
