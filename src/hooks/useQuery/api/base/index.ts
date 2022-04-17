import { useQuery as useReactQuery, UseQueryResult } from "react-query";

import { QueryOptions } from "../types";

import { apiBase } from "@/services/app";

export function useQueryBase<Data, Error = unknown>(
  url: string,
  options?: QueryOptions<Data, Error>
): UseQueryResult<Data, Error> {
  const {
    query = url,
    params = null,
    optionsQuery = undefined,
  } = options || {};
  const response = useReactQuery<Data, Error>(
    [query, params],
    async () => {
      const { data } = await apiBase.get(url, { params });
      return data;
    },
    optionsQuery
  );

  return response;
}
