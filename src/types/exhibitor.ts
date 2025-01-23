export type Exhibitor = {
  email: string;
  name: string;
  job: string;
  country: string;
  company: string;
};

export type ExhibitorPayload = {
  S_added_via: string;
  S_company: string;
  S_email_address: string;
  S_group_reg_id: string;
  S_name_on_badge: string;
  S_job_title: string;
  S_country: string;
  S_company_on_badge: string;
  SB_event_fha: boolean;
  SB_event_prowine: boolean;
};

export type FailureStats = {
  failCount: number;
  totalCount: number;
  errors: Array<{ originalIndex: number; message: string }>;
};
