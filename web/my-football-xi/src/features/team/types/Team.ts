
export interface Team {
  id: string;
  name: string;
  shortName: string;
  logo: string;
  stadium?: string;
  primaryColor: string;
  logoClass: string;
}

export interface League {
  id: string;
  name: string;
  logo: string;
  country: string;
}
