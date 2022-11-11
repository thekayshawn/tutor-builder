export type PaginatedEntity<T> = {
  numOfPages: number;
  currentPage: number;
  records: T[];
};

export type RawPaginatedEntity<T> = {
  page_no: string;
  number_of_pages: string;
  data: T[];
};
