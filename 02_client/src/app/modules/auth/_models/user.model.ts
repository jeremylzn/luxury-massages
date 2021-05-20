import { AuthModel } from './auth.model';
import { AddressModel } from './address.model';
import { SocialNetworksModel } from './social-networks.model';

export class UserModel extends AuthModel {
  id?: string;
  username?: string;
  password: string;
  fullname: string;
  email: string;
  distributor?: string;
  gender?:string;
  pic?: string;
  roles?: number[];
  role:number
  occupation?: string;
  companyName?: string;
  telephone: string;
  address?: AddressModel;
  socialNetworks?: SocialNetworksModel;
  // personal information
  firstname?: string;
  lastname?: string;
  website?: string;
  // account information
  language?: string;
  timeZone?: string;
  communication?: {
    email: boolean,
    sms: boolean,
    phone: boolean
  };
  // email settings
  emailSettings?: {
    emailNotification: boolean,
    sendCopyToPersonalEmail: boolean,
    activityRelatesEmail: {
      youHaveNewNotifications: boolean,
      youAreSentADirectMessage: boolean,
      someoneAddsYouAsAsAConnection: boolean,
      uponNewOrder: boolean,
      newMembershipApproval: boolean,
      memberRegistration: boolean
    },
    updatesFromKeenthemes: {
      newsAboutKeenthemesProductsAndFeatureUpdates: boolean,
      tipsOnGettingMoreOutOfKeen: boolean,
      thingsYouMissedSindeYouLastLoggedIntoKeen: boolean,
      newsAboutMetronicOnPartnerProductsAndOtherServices: boolean,
      tipsOnMetronicBusinessProducts: boolean
    }
  };

  setUser(user: any) {
    this.id = user.id;
    this.username = user.username;
    this.password = user.password || '';
    this.fullname = user.fullname || '';
    this.email = user.email || '';
    this.distributor = user.distributor || '';
    this.pic = user.pic;
    this.roles = user.roles;
    this.role = user.role || 3;
    this.occupation = user.occupation;
    this.companyName = user.companyName;
    this.telephone = user.telephone || '';
    this.address = user.address || '';
    this.socialNetworks = user.socialNetworks;
  }
}
