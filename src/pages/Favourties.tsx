import { useMemo, useState } from "react";
import { useRecoilState } from "recoil";
import { BanksTable } from "../components/BanksTable";
import { Pagination } from "../components/Pagination";
import { bankAtom } from "./Home";

/**
 *
 * It displays the favourites banks marked by the user. The list is stored in user localStorage.
 */
const Favourties = () => {
	const [page, setPage] = useState(1);
	const [pageSize, setPageSize] = useState(10);
	const [{ favourites }] = useRecoilState(bankAtom);

	// Slices the favourites list on page change.
	const filteredFavourites = useMemo(() => {
		if (!favourites) return;
		const firstPageIndex = (page - 1) * pageSize;
		const lastPageIndex = firstPageIndex + pageSize;
		return favourites.slice(firstPageIndex, lastPageIndex);
	}, [page, favourites, pageSize]);

	return (
		<>
			<BanksTable
				pageSize={pageSize}
				banks={filteredFavourites}
				title="Favourites"
				subtitle="A list of your favourite banks in your city including their name, ID, IFSC, branch and address."
			/>
			<Pagination
				banks={filteredFavourites}
				setPageSize={(size) => setPageSize(size)}
				pageSize={pageSize}
				siblingCount={1}
				marginPages={1}
				totalCount={favourites?.length ?? 0}
				page={page}
				setPage={(page) => setPage(page)}
			/>
		</>
	);
};

export default Favourties;
