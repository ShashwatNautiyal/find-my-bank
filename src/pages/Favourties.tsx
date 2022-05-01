import { useMemo, useState } from "react";
import { useRecoilState } from "recoil";
import { BanksTable } from "../components/BanksTable";
import { Pagination } from "../components/Pagination";
import { bankAtom } from "./Home";

const Favourties = () => {
	const [page, setPage] = useState(1);
	const [pageSize, setPageSize] = useState(10);
	const [{ favourites }] = useRecoilState(bankAtom);

	const filteredFavourites = useMemo(() => {
		if (!favourites) return;
		const firstPageIndex = (page - 1) * pageSize;
		const lastPageIndex = firstPageIndex + pageSize;
		return favourites.slice(firstPageIndex, lastPageIndex);
	}, [page, favourites, pageSize]);

	return (
		<>
			<BanksTable
				banks={filteredFavourites}
				title="Favourites"
				subtitle="A list of your favourite banks in your city including their name, ID, IFSC, branch and address."
			/>
			<Pagination
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
