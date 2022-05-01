import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/outline";
import { useCallback, useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { useRecoilState } from "recoil";
import { bankAtom } from "../pages/Home";
import { classNames, debounce, usePagination } from "../utils";

export const Pagination = ({
	page,
	totalCount,
	siblingCount,
	pageSize,
	setPage,
	setPageSize,
	marginPages,
}: {
	page: number;
	totalCount: number;
	siblingCount: number;
	pageSize: number;
	setPageSize: (size: number) => void;
	setPage: (page: number) => void;
	marginPages: number;
}) => {
	const paginationMap = usePagination({
		page,
		totalCount,
		siblingCount,
		pageSize,
		marginPages,
	});

	const [pageSizeInput, setPageSizeInput] = useState(pageSize);

	const handlePageSize = useCallback(
		debounce((e: React.ChangeEvent<HTMLInputElement>) => {
			if (e.target.value === "") {
				setPageSize(1);
			} else {
				setPageSize(parseInt(e.target.value));
			}
		}, 300),
		[]
	);

	return (
		<div className="flex my-4 md:flex-row flex-col items-center gap-4 justify-between px-0 sm:px-6 lg:px-8">
			<div>
				<p className="text-sm text-gray-700">
					Showing <span className="font-medium">{(page - 1) * pageSize + 1}</span> to{" "}
					<span className="font-medium">{page * pageSize}</span> of{" "}
					<span className="font-medium">{totalCount}</span> results
				</p>
			</div>
			<div className="flex md:flex-row flex-col items-center gap-4 justify-center">
				<div className="relative border border-gray-300 rounded-md px-3 py-2 shadow focus-within:ring-1 focus-within:ring-indigo-600 focus-within:border-indigo-600">
					<label
						htmlFor="name"
						className="absolute -top-2 left-2 -mt-px inline-block px-1 bg-white text-xs font-medium text-gray-900"
					>
						Items / Page
					</label>
					<input
						type="number"
						name="number"
						className="block md:w-20 w-full outline-none border-0 p-0 text-gray-900 placeholder-gray-500 focus:ring-0 text-sm"
						value={pageSizeInput === 0 ? "" : pageSizeInput}
						onChange={(e) => {
							if (e.target.value === "") {
								setPageSizeInput(0);
							} else setPageSizeInput(parseInt(e.target.value));
							handlePageSize(e);
						}}
					/>
				</div>
				<div>
					<nav
						className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
						aria-label="Pagination"
					>
						<li
							onClick={() => setPage(page - 1)}
							className={`relative inline-flex items-center md:px-2 px-1.5 md:py-2 py-1.5 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 cursor-pointer hover:bg-gray-50 ${
								page === 1 ? "pointer-events-none opacity-50" : ""
							}`}
						>
							<ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
						</li>

						{paginationMap?.map((item, index) => (
							<li
								onClick={() => {
									if (typeof item === "number") setPage(item);
									else if (
										typeof item === "string" &&
										index < paginationMap.length / 2
									)
										setPage(page - siblingCount * 2);
									else if (
										typeof item === "string" &&
										index > paginationMap.length / 2
									)
										setPage(page + siblingCount * 2);
								}}
								aria-current="page"
								className={classNames(
									item === page
										? "z-10 bg-indigo-50 border-indigo-500 text-indigo-600"
										: "bg-white border-gray-300 text-gray-500 hover:bg-gray-50",
									" relative cursor-pointer inline-flex items-center md:px-4 px-2 md:py-2 py-1.5 border text-sm font-medium"
								)}
							>
								{item}
							</li>
						))}

						<li
							onClick={() => setPage(page + 1)}
							className={`relative inline-flex items-center md:px-2 px-1.5 md:py-2 py-1.5 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 cursor-pointer hover:bg-gray-50 ${
								page === Math.ceil(totalCount / pageSize)
									? "pointer-events-none opacity-50"
									: ""
							}`}
						>
							<ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
						</li>
					</nav>
				</div>
			</div>
		</div>
	);
};
