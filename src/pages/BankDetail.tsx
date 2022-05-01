import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useRecoilState } from "recoil";
import Bank from "../types/Bank";
import { classNames } from "../utils";
import { bankAtom } from "./Home";

const BankDetail = () => {
	const { ifsc } = useParams();

	const [bank, setBank] = useState<Bank | undefined>(undefined);

	const [{ banks, isLoading }] = useRecoilState(bankAtom);

	useEffect(() => {
		if (banks) {
			setBank(banks.find((bank) => bank.ifsc === ifsc));
		}
	}, [banks]);

	return (
		<div className="px-4 sm:px-6 lg:px-8 mt-7">
			<div className="sm:flex sm:items-center">
				<div className="sm:flex-auto">
					<h1 className="text-xl font-semibold text-gray-900">Bank Details</h1>
					<p className="mt-2 text-sm text-gray-700">
						Details of the bank in selectd which shows name, ID, IFSC code, branch,
						city, district, state and address.
					</p>
				</div>
			</div>
			<div className="mt-8 flex flex-col">
				<div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
					<div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
						<div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
							<table className="min-w-full divide-y divide-gray-300">
								<tbody className="divide-y divide-gray-200 bg-white">
									{isLoading ? (
										bankFormat.map((_, index) => (
											<tr
												className={classNames(
													"bg-gray-300",
													"divide-x animate-pulse divide-gray-200"
												)}
											>
												<td className="h-14 w-1/4"></td>
												<td className="h-14 "></td>
											</tr>
										))
									) : bank ? (
										bankFormat.map((item) => (
											<tr className="divide-x divide-gray-200">
												<td className="whitespace-nowrap w-1/4 py-4 pl-4 pr-4 text-sm font-medium text-gray-900 sm:pl-6">
													{item.label}
												</td>
												<td className="whitespace-nowrap p-4 text-sm text-gray-500">
													{bank && bank[item.value as keyof typeof bank]}
												</td>
											</tr>
										))
									) : (
										<tr className="divide-x divide-gray-200">
											<td className="whitespace-nowrap w-1/4 py-4 pl-4 pr-4 text-sm font-medium text-gray-900 sm:pl-6">
												Nothing Found
											</td>
										</tr>
									)}
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

const bankFormat = [
	{
		label: "Bank Name",
		value: "bank_name",
	},
	{
		label: "Bank ID",
		value: "bank_id",
	},
	{
		label: "Branch Name",
		value: "branch",
	},
	{
		label: "Address",
		value: "address",
	},
	{
		label: "City",
		value: "city",
	},
	{
		label: "District",
		value: "district",
	},
	{
		label: "State",
		value: "state",
	},
];

export default BankDetail;
