export type City = {
  level1_active: number;
  country: string;
  coutry_code: string;
  level2_active: number;
  province: string;
  level3_active: number;
  city: string;
};

export type Country = {
  name: {
    common: string;
    official: string;
  };
};
