import { Disclosure } from "@headlessui/react";
import { MenuIcon, XIcon } from "@heroicons/react/outline";
import { SearchIcon } from "@heroicons/react/solid";
import { useCallback, useEffect, useState } from "react";
import Select from "./Select";
import { useRecoilState } from "recoil";
import { bankAtom } from "../pages/Home";
import { useBanksByCityName } from "../apis/BankApi";
import { classNames, debounce } from "../utils";
import { Link, useResolvedPath, useSearchParams } from "react-router-dom";

const navigation = [
	{ name: "All Banks", href: "/all-banks" },
	{ name: "Favorites", href: "/favourites" },
];

const Navbar = () => {
	const [selectedState, setSelectedState] = useState(stateOptions[0]);
	const [selectedSearch, setSelectedSearch] = useState(searchOptions[0]);
	const [searchInput, setSearchInput] = useState("");
	const { data, isLoading, error } = useBanksByCityName(selectedState.value);
	let [searchParams, setSearchParams] = useSearchParams();

	const [_, setBankState] = useRecoilState(bankAtom);

	const resolved = useResolvedPath(window.location);
	const isHome = resolved.pathname === "/all-banks";

	useEffect(() => {
		if (error) {
			setBankState((prev) => ({
				...prev,
				isLoading: false,
				error,
				banks: undefined,
				favourites: undefined,
			}));
		}
		if (data) {
			setBankState((prev) => {
				if (localStorage.getItem("favourites")) {
					return {
						...prev,
						banks: data,
						isLoading: false,
						favourites: JSON.parse(localStorage.getItem("favourites") ?? ""),
					};
				}
				return {
					...prev,
					banks: data,
					isLoading: false,
				};
			});
		} else {
			setBankState((prev) => ({
				...prev,
				isLoading,
			}));
		}
	}, [data, isLoading]);

	const handleSearch = useCallback(
		debounce((search) => {
			if (search === "") {
				setBankState((prev) => ({
					...prev,
					banks: data,
				}));
				return;
			}
			const _banks = data?.filter((item) => {
				let value = item[selectedSearch.value as keyof typeof item];
				if (typeof value === "number") {
					return parseInt(search) === value;
				} else if (typeof value == "string") {
					return value.toLowerCase().includes(search.toLowerCase());
				}
			});

			setBankState((prev) => ({
				...prev,
				banks: _banks,
			}));
			let newSearchParams = new URLSearchParams(searchParams);
			newSearchParams.set("page", "1");
			setSearchParams(newSearchParams);
		}, 300),
		[searchInput]
	);

	return (
		<Disclosure as="nav" className="bg-gray-800">
			{({ open }) => (
				<>
					<div className="max-w-7xl  mx-auto px-2 sm:px-2 lg:px-4">
						<div className="flex md:flex-row flex-col justify-between md:h-16 h-full md:py-0 py-2 md:gap-0 gap-2">
							<div className="flex items-center w-full justify-between">
								<div className="flex flex-1 items-center justify-start">
									<div className="-ml-2 flex items-center md:hidden">
										<Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
											<span className="sr-only">Open main menu</span>
											{open ? (
												<XIcon
													className="block h-6 w-6"
													aria-hidden="true"
												/>
											) : (
												<MenuIcon
													className="block h-6 w-6"
													aria-hidden="true"
												/>
											)}
										</Disclosure.Button>
									</div>

									<img
										className="md:h-12 h-9  w-auto"
										src="/bank.png"
										alt="Groww Bank"
									/>

									<div className="hidden lg:ml-6 ml-2 md:flex md:items-center lg:space-x-4 space-x-1">
										{navigation.map((item) => (
											<Link
												key={item.href}
												to={item.href}
												className={classNames(
													item.href === resolved.pathname
														? "bg-gray-900 text-white"
														: "text-gray-300 hover:bg-gray-700 hover:text-white",
													"md:px-3 px-1 py-2 rounded-md text-sm font-medium"
												)}
											>
												{item.name}
											</Link>
										))}
									</div>
								</div>
								{isHome && (
									<Select
										position="left"
										options={stateOptions}
										selected={selectedState}
										setSelected={setSelectedState}
									/>
								)}
							</div>

							{isHome && (
								<div className="flex gap-2 items-center justify-center md:px-2 lg:ml-10 lg:justify-end">
									<Select
										options={searchOptions}
										selected={selectedSearch}
										setSelected={setSelectedSearch}
									/>
									<div className="max-w-3xl w-full lg:max-w-xs">
										<label htmlFor="search" className="sr-only">
											Search
										</label>
										<div className="relative">
											<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
												<SearchIcon
													className="h-4 w-4 text-gray-400"
													aria-hidden="true"
												/>
											</div>
											<input
												id="search"
												name="search"
												className="block md:w-72 w-full pl-10 pr-3 py-2 border border-transparent rounded-md leading-5 bg-gray-700 text-gray-300 placeholder-gray-400 focus:outline-none focus:bg-white focus:border-white focus:ring-white focus:text-gray-900 text-sm"
												placeholder={`Search ${selectedSearch.label}`}
												type="search"
												value={searchInput}
												onChange={(e) => {
													setSearchInput(e.target.value);
													handleSearch(e.target.value);
												}}
											/>
										</div>
									</div>
								</div>
							)}
						</div>
					</div>

					<Disclosure.Panel className="md:hidden">
						<div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
							{navigation.map((item) => (
								<Disclosure.Button
									key={item.name}
									as="a"
									href={item.href}
									className={classNames(
										item.href === resolved.pathname
											? "bg-gray-900 text-white"
											: "text-gray-300 hover:bg-gray-700 hover:text-white",
										"block px-3 py-2 rounded-md text-base font-medium"
									)}
								>
									{item.name}
								</Disclosure.Button>
							))}
						</div>
					</Disclosure.Panel>
				</>
			)}
		</Disclosure>
	);
};

const stateOptions = [
	{
		label: "Delhi",
		value: "DELHI",
	},
	{
		label: "Mumbai",
		value: "MUMBAI",
	},
	{
		label: "Noida",
		value: "NOIDA",
	},
	{
		label: "Meerut",
		value: "MEERUT",
	},
	{
		label: "Pune",
		value: "PUNE",
	},
];

const searchOptions = [
	{
		label: "Bank",
		value: "bank_name",
	},
	{
		label: "IFSC",
		value: "ifsc",
	},
	{
		label: "ID",
		value: "bank_id",
	},
	{
		label: "Branch",
		value: "branch",
	},
	{
		label: "District",
		value: "district",
	},
	{
		label: "Address",
		value: "address",
	},
];

export default Navbar;
