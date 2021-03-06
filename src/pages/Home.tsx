import Bank from "../types/Bank";
import { atom, useRecoilState } from "recoil";
import { BanksTable } from "../components/BanksTable";
import { Pagination } from "../components/Pagination";
import { useEffect, useMemo, useState } from "react";
import { AxiosError } from "axios";
import { useSearchParams } from "react-router-dom";

/**
 *
 * Home page is the default page. It renders the all banks table
 */
const Home = () => {
	const [page, setPage] = useState(1);
	const [{ banks }] = useRecoilState(bankAtom);
	const [pageSize, setPageSize] = useState(10);
	let [searchParams, setSearchParams] = useSearchParams();

	// Fetches the current page from the URL and paginate to that page.
	let paramValue = searchParams.get("page");
	useEffect(() => {
		setPage(parseInt(paramValue ?? "1"));
	}, [paramValue]);

	// Slice the bank list on page change.
	const filteredBanks = useMemo(() => {
		if (!banks) return;
		const firstPageIndex = (page - 1) * pageSize;
		const lastPageIndex = firstPageIndex + pageSize;
		return banks.slice(firstPageIndex, lastPageIndex);
	}, [page, banks, pageSize]);

	return (
		<>
			<BanksTable
				banks={filteredBanks}
				pageSize={pageSize}
				title="Find Your Bank"
				subtitle="A list of all the banks in your city including their name, ID, IFSC, branch and address."
			/>
			<Pagination
				banks={filteredBanks}
				pageSize={pageSize}
				marginPages={1}
				setPageSize={(size) => setPageSize(size)}
				siblingCount={1}
				totalCount={banks?.length ?? 0}
				page={page}
				setPage={(page) => {
					let newSearchParams = new URLSearchParams(searchParams);
					newSearchParams.set("page", page.toString());
					setSearchParams(newSearchParams);
					setPage(page);
				}}
			/>
		</>
	);
};

/**
 * Global state of the Banks, loading, error and favourites.
 */
export const bankAtom = atom({
	key: "bankAtom",
	default: {
		banks: undefined as Bank[] | undefined,
		isLoading: false,
		favourites: undefined as Bank[] | undefined,
		error: null as Error | null,
	},
});

export default Home;
