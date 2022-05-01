import { BsBookmark, BsFillBookmarkFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { bankAtom } from "../pages/Home";
import Bank from "../types/Bank";
import { classNames } from "../utils";

export const BanksTable = ({
	title,
	subtitle,
	banks,
	pageSize,
}: {
	title: string;
	subtitle: string;
	banks?: Bank[];
	pageSize: number;
}) => {
	return (
		<div className="px-4 sm:px-6 lg:px-8 mt-7">
			<div className="flex flex-col">
				<h1 className="text-xl font-semibold text-gray-900">{title}</h1>
				<p className="mt-2 text-sm text-gray-700">{subtitle}</p>
			</div>
			<div className="mt-7 flex flex-col">
				<div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
					<div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
						<div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
							<table className="min-w-full divide-y divide-gray-300">
								<thead className="bg-gray-50">
									<tr>
										<th
											scope="col"
											className="lg:py-3.5 md:py-3 py-2.5 pl-4 lg:pr-3 md:pr-2.5 pr-2 text-left text-sm font-semibold text-gray-900 sm:pl-6"
										>
											Bank
										</th>
										<th
											scope="col"
											className="lg:px-3 md:px-2.5 px-2 lg:py-3.5 md:py-3 py-2.5 text-left text-sm font-semibold text-gray-900"
										>
											ID
										</th>
										<th
											scope="col"
											className="lg:px-3 md:px-2.5 px-2 lg:py-3.5 md:py-3 py-2.5 text-left text-sm font-semibold text-gray-900"
										>
											IFSC
										</th>
										<th
											scope="col"
											className="lg:px-3 md:px-2.5 px-2 lg:py-3.5 md:py-3 py-2.5 text-left text-sm font-semibold text-gray-900"
										>
											Branch
										</th>
										<th
											scope="col"
											className="lg:px-3 md:px-2.5 px-2 lg:py-3.5 md:py-3 py-2.5 text-left text-sm font-semibold text-gray-900"
										>
											Address
										</th>
										<th
											scope="col"
											className="lg:px-3 md:px-2.5 px-2 lg:py-3.5 md:py-3 py-2.5 text-center text-sm font-semibold text-gray-900"
										>
											Favourites
										</th>
									</tr>
								</thead>
								<tbody className="bg-white">
									<LoadingTable banks={banks} pageSize={pageSize} />
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

const LoadingTable = ({ banks, pageSize }: { banks?: Bank[]; pageSize: number }) => {
	const navigate = useNavigate();

	const [{ isLoading, favourites, error }, setBankState] = useRecoilState(bankAtom);

	if (error) {
		return (
			<tr>
				<td className="whitespace-nowrap h-12 text-sm font-medium text-gray-900 sm:pl-6 pl-4">
					{error.message}
				</td>
			</tr>
		);
	}

	const handleFavourites = (bank: Bank) => {
		let _favourites = favourites ? [...favourites] : [];
		const fav = _favourites.find((item) => item.ifsc === bank.ifsc);
		if (fav) {
			setBankState((prev) => ({
				...prev,
				favourites: _favourites.filter((item) => item.ifsc !== fav.ifsc),
			}));
			localStorage.setItem(
				"favourites",
				JSON.stringify(_favourites.filter((item) => item.ifsc !== fav.ifsc))
			);
		} else {
			setBankState((prev) => ({
				...prev,
				favourites: [..._favourites, bank],
			}));
			localStorage.setItem("favourites", JSON.stringify([..._favourites, bank]));
		}
	};

	if (isLoading) {
		return (
			<>
				{new Array(pageSize).fill(0).map((_, index) => (
					<tr
						key={index}
						className={classNames(
							index % 2 === 0 ? "" : "bg-gray-300",
							"animate-pulse"
						)}
					>
						<td className="whitespace-nowrap h-12 text-sm font-medium text-gray-900"></td>
						<td className="whitespace-nowrap h-12 text-sm text-gray-500"></td>
						<td className="whitespace-nowrap h-12 text-sm text-gray-500"></td>
						<td className="whitespace-nowrap h-12 text-sm text-gray-500"></td>
						<td className="whitespace-nowrap h-12 text-sm text-gray-500"></td>
						<td className="whitespace-nowrap h-12 text-sm text-gray-500"></td>
					</tr>
				))}
			</>
		);
	}

	if (!banks || banks.length === 0) {
		return (
			<tr>
				<td className="whitespace-nowrap h-12 text-sm font-medium text-gray-900 sm:pl-6 pl-4">
					Nothing Found
				</td>
			</tr>
		);
	}

	return (
		<>
			{banks?.map((bank, index) => (
				<tr
					key={bank.ifsc}
					className={classNames(
						index % 2 === 0 ? "" : "bg-gray-50",
						"hover:shadow hover:bg-gray-200 transition-colors"
					)}
				>
					<td
						onClick={() => navigate(`/bank-details/${bank.ifsc}`)}
						className="whitespace-nowrap cursor-pointer md:py-4 sm:py-3 py-2.5 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6"
					>
						{bank.bank_name}
					</td>
					<td
						onClick={() => navigate(`/bank-details/${bank.ifsc}`)}
						className="whitespace-nowrap cursor-pointer md:py-4 sm:py-3 py-2.5 px-3 text-sm font-medium text-gray-900"
					>
						{bank.bank_id}
					</td>
					<td
						onClick={() => navigate(`/bank-details/${bank.ifsc}`)}
						className="whitespace-nowrap cursor-pointer px-3 md:py-4 sm:py-3 py-2.5 text-sm text-gray-500"
					>
						{bank.ifsc}
					</td>
					<td
						onClick={() => navigate(`/bank-details/${bank.ifsc}`)}
						className="whitespace-nowrap cursor-pointer px-3 md:py-4 sm:py-3 py-2.5 text-sm text-gray-500"
					>
						{bank.branch}
					</td>
					<td
						style={{ minWidth: "300px" }}
						onClick={() => navigate(`/bank-details/${bank.ifsc}`)}
						className="whitespace-wrap cursor-pointer max-w-lg px-3 md:py-4 sm:py-3 py-2.5 text-sm text-gray-500"
					>
						{bank.address}
					</td>
					<td className="whitespace-wrap max-w-sm px-3 py-2 text-sm text-gray-500">
						{favourites?.find((item) => item.ifsc === bank.ifsc) ? (
							<BsFillBookmarkFill
								onClick={() => {
									handleFavourites(bank);
								}}
								className={"text-gray-800 h-4 w-4 mx-auto cursor-pointer"}
							/>
						) : (
							<BsBookmark
								width={20}
								onClick={() => {
									handleFavourites(bank);
								}}
								className={"h-4 w-4 mx-auto cursor-pointer"}
							/>
						)}
					</td>
				</tr>
			))}
		</>
	);
};
