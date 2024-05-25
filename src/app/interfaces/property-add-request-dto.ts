export interface PropertyAddRequestDto {
    address: string;
    area: number;
    description: string;
    pets: boolean;
    city: string;
    rentAmount: number;
    utilityCost: number;
    deposit: number;
    streetName: string;
    livingRooms: number;
    features: Set<string>;
    images: File[];
  }