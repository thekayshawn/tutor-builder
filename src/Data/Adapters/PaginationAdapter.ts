import {
  PaginatedEntity,
  RawPaginatedEntity,
} from "../Entities/PaginatedEntity";

/* eslint-disable eqeqeq */
export default class PaginationAdapter {
  serialize<T>(state: PaginatedEntity<T>): RawPaginatedEntity<T> {
    return {
      data: state.records || [],
      page_no: state.currentPage.toString() || "1",
      number_of_pages: state.numOfPages.toString() || "1",
    };
  }

  deserialize<T>(state: RawPaginatedEntity<T>): PaginatedEntity<T> {
    return {
      records: state.data || [],
      currentPage: parseInt(state.page_no) || 1,
      numOfPages: parseInt(state.number_of_pages) || 1,
    };
  }
}
