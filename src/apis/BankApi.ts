import { useQuery } from "react-query";
import Bank from "../types/Bank";
import axios from "../utils/axios";

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
