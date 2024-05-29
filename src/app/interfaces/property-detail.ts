export interface PropertyDetail {
    id?: number;
    owner?: {
      id?: number;
      name?: string;
      lastname?: string;
      username?: string;
      phoneNumber?: string | null;
    };
    address?: string;
    area?: number;
    description?: string;
    pets?: boolean;
    features?: {
      id?: number;
      name?: string;
    }[];
    city?: {
      id?: number;
      region?: {
        id?: number;
        regionName?: string;
        countryInfoDto?: {
          id?: number;
          countryName?: string;
        };
      };
      name?: string;
    };
    rentAmount?: number;
    utilityCost?: number;
    deposit?: number;
    streetName?: string;
    photos?: {
      id?: number;
      photo?: string;
      isMain?: boolean;
    }[];
    livingRooms?: number;
    contract_id?: string | null;
    propertyStatus?: number;
    tenantsId?: [];
  }
  