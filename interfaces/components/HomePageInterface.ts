import { StrapiImageInterface } from "../StrapiImageInterface";

export interface HomePageInterface{
  info: {
    displayName: 'Home Page';
  };
  attributes: {
    description: string;
    coverImage: StrapiImageInterface;
  };
}
