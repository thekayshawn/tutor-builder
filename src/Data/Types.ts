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

export type Directions =
  | "top"
  | "right"
  | "bottom"
  | "left"
  | "top-left"
  | "top-right"
  | "bottom-right"
  | "bottom-left";

export type Breakpoint = "xs" | "sm" | "md" | "lg" | "xl" | "xxl";
