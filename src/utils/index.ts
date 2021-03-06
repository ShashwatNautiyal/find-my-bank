import { useMemo } from "react";

/**
 *
 * @param classes Array of string
 * @returns Single string of all strings passed in the array
 */
export function classNames(...classes: string[]) {
	return classes.filter(Boolean).join(" ");
}

/**
 *
 * @param func Function that runs after the timer is off in debounce function.
 * @param timeout Time in miliseconds to clearTimeout.
 * @returns void
 */
export function debounce(
	func: (...params: any[]) => any,
	timeout: number
): (this: any, ...args: any[]) => void {
	let timer: ReturnType<typeof setTimeout>;
	return function (this: any, ...args: any[]) {
		clearTimeout(timer);
		timer = setTimeout(() => {
			func.apply(this, args);
		}, timeout);
	};
}

/**
 *
 * @param start First number of the array
 * @param end Last number of the array
 * @returns Array of the numbers from start to end
 */
const makeArray = (start: number, end: number) => {
	let length = end - start + 1;
	return Array.from({ length }, (_, idx) => idx + start);
};

export const usePagination = ({
	totalCount,
	pageSize,
	siblingCount = 1,
	page,
	marginPages = 1,
}: {
	totalCount: number;
	pageSize: number;
	siblingCount?: number;
	page: number;
	marginPages?: number;
}) => {
	const paginationMap = useMemo(() => {
		const totalPageCount = Math.ceil(totalCount / pageSize);

		const totalPageNumbers = siblingCount + 2 + marginPages * 2;

		if (totalPageNumbers >= totalPageCount) {
			return makeArray(1, totalPageCount);
		}

		const leftIndex = Math.max(page - siblingCount, 1);
		const rightIndex = Math.min(page + siblingCount, totalPageCount);

		const isLeftDots = leftIndex > marginPages * 2;
		const isRightDots = rightIndex < totalPageCount - marginPages * 2;

		const firstPageIndex = 1;
		const lastPageIndex = totalPageCount;

		if (!isLeftDots && isRightDots) {
			let leftItemCount = marginPages * 2 + 2 * siblingCount + 1;
			let leftRange = makeArray(1, leftItemCount);

			return [...leftRange, "...", totalPageCount];
		}

		if (isLeftDots && !isRightDots) {
			let rightItemCount = marginPages * 2 + 1 + 2 * siblingCount;
			let rightRange = makeArray(totalPageCount - rightItemCount + 1, totalPageCount);
			return [firstPageIndex, "...", ...rightRange];
		}

		if (isLeftDots && isRightDots) {
			let middleRange = makeArray(leftIndex, rightIndex);
			return [
				...makeArray(firstPageIndex, marginPages),
				"...",
				...middleRange,
				"...",
				...makeArray(totalPageCount - marginPages + 1, lastPageIndex),
			];
		}
	}, [totalCount, pageSize, siblingCount, page]);

	return paginationMap;
};
