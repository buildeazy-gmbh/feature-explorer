export type Status = 'production' | 'development' | 'planned' | 'evaluation';

export type Feature = {
  name: string;
  group: string;
  status: Status;
  customers: string[];
};

export type Filters = {
  featureGroup?: string;
  implementationStatus?: string;
  targetCustomers: string;
};
