export type DocumentHeadProps = {
  title: string;
  description?: string;
};

export type Boolbacks = {
  onSuccess: (data: any) => void;
  onFailure: (message: string) => void;
};
