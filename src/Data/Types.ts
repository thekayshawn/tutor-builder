export type RequestState = {
  message?: string;
  status: "idle" | "loading" | "loaded" | "erred";
};

export type DocumentHeadProps = {
  title: string;
  description?: string;
};

export type Boolbacks<T> = {
  onSuccess: (data: T) => void;
  onFailure: (message: string) => void;
};
