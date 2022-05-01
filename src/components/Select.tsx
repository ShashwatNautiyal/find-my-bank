import { Fragment } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, SelectorIcon } from "@heroicons/react/solid";
import { classNames } from "../utils";

interface SelectProps {
	options: Option[];
	selected: Option;
	setSelected: React.Dispatch<React.SetStateAction<Option>>;
	position?: "left" | "right" | undefined;
}

type Option = {
	label: string;
	value: string;
};

/**
 * It shows the dropdown with the option passed in props.
 */
const Select = (props: SelectProps) => {
	const { options, selected, setSelected, position } = props;

	return (
		<Listbox value={selected} onChange={setSelected}>
			{({ open }) => (
				<>
					<div className="relative">
						<Listbox.Button className="relative w-full border border-transparent bg-gray-700 text-gray-300 rounded-md shadow-sm md:pl-3 pl-1.5 md:pr-10 pr-6 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 text-sm">
							<span className="block truncate">{selected.label}</span>
							<span className="absolute inset-y-0 right-0 flex items-center md:pr-2 pr-q pointer-events-none">
								<SelectorIcon
									className="h-5 w-5 text-gray-400"
									aria-hidden="true"
								/>
							</span>
						</Listbox.Button>

						<Transition
							show={open}
							as={Fragment}
							leave="transition ease-in duration-100"
							leaveFrom="opacity-100"
							leaveTo="opacity-0"
						>
							<Listbox.Options
								className={classNames(
									position === "left" ? "right-0" : "left-0",
									"absolute  z-10 mt-1 min-w-full bg-white shadow-lg max-h-60 rounded-md py-1 ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none text-sm"
								)}
							>
								{options.map((option, index) => (
									<Listbox.Option
										key={index}
										className={({ active }) =>
											classNames(
												active
													? "text-white bg-indigo-600"
													: "text-gray-900",
												"cursor-default select-none relative py-2 md:pl-8 pl-6 pr-4"
											)
										}
										value={option}
									>
										{({ selected, active }) => (
											<>
												<span
													className={classNames(
														selected ? "font-semibold" : "font-normal",
														"block truncate"
													)}
												>
													{option.label}
												</span>

												{selected ? (
													<span
														className={classNames(
															active
																? "text-white"
																: "text-indigo-600",
															"absolute inset-y-0 left-0 flex items-center pl-1"
														)}
													>
														<CheckIcon
															className="h-5 w-5"
															aria-hidden="true"
														/>
													</span>
												) : null}
											</>
										)}
									</Listbox.Option>
								))}
							</Listbox.Options>
						</Transition>
					</div>
				</>
			)}
		</Listbox>
	);
};

export default Select;
