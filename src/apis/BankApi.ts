import { useQuery } from "react-query";
import Bank from "../types/Bank";
import axios from "../utils/axios";

/**
 *
 * @param city Pass city name to fetch the bank list from that city.
 * @returns Array of Bank type or Axios Error.
 */
export const useBanksByCityName = (city: string) => {
	return useQuery<Bank[], Error>(["banks", city], async () => {
		return axios
			.get<Bank[]>("/banks", {
				params: {
					city,
				},
			})
			.then((res) => res.data);
	});
};
