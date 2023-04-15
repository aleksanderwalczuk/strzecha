import * as Components from "./components/index";

export interface SettingsInterface {
  contact: Components.ContactInterface;
  // eslint-disable-next-line camelcase
  home_page: Components.HomePageInterface;
  navigation: Components.NavigationInterface;
  socials: Components.SocialInterface[];
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}
