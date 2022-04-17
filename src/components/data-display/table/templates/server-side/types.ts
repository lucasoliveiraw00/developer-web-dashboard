import { ColumnProps } from 'antd/lib/table';
import { FilterValue, SorterResult } from 'antd/lib/table/interface';

export type Sorter =
  | SorterResult<Record<string, FilterValue | null>>
  | SorterResult<Record<string, FilterValue | null>>[];

export type Params = {
  page?: number | undefined;
  perPage?: number | undefined;
  sort?: 'asc' | 'desc' | undefined;
  order?: string | undefined;
};

export type TableData = {
  meta: {
    total: number;
    per_page: number;
    current_page: number;
    last_page: number;
    first_page: number;
  };
  data: object[];
};

export type RefTableServerSideProps = {
  refetchTableData: () => void;
};

export type TableServerSideProps = {
  urlFetch: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  columns: ColumnProps<object | any>[];
  refTable?: (ref: RefTableServerSideProps) => void;
};
