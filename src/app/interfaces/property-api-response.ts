import { Property } from '../shared/Property';

export interface PropertyApiResponse {
    content: Property[];
    pageable: string;
    last: boolean;
    totalElements: number;
    totalPages: number;
    first: boolean;
    numberOfElements: number;
    size: number;
    number: number;
    sort: {
      unsorted: boolean;
      empty: boolean;
      sorted: boolean;
    };
    empty: boolean;
  }
  