import {ContactInfo} from "./contact-info";

export class Listing {

  public static clone(listing: Listing): Listing {
    return listing;
  }
  constructor(
    public sellerId: string,
    public title: string,
    public description: string,
    public price: number,
    public categories: string[],
    public imageId: string,
    public contactInfo: ContactInfo
  ) {}
}