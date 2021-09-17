import React from 'react';
import { BiChevronLeft, BiChevronRight } from 'react-icons/bi';
import ReactPaginate from 'react-paginate';

interface Props {
	page?: number;
	totalPage?: number;
	onPageChange: (page: number) => void;
}

export const PAGINATION = ({ page = 1, totalPage = 1, onPageChange }: Props) => {
	return (
		<ReactPaginate
			breakLabel={'break-me'}
			breakClassName={'break-class'}
			breakLinkClassName={'break-link'}
			disableInitialCallback={false}
			containerClassName={'pagination'}
			marginPagesDisplayed={5}
			forcePage={page - 1}
			initialPage={0}
			pageCount={totalPage}
			pageRangeDisplayed={10}
			pageClassName={'page-item'}
			pageLinkClassName={'page-link'}
			// pageLabelBuilder={(page: number) => `${page}`}
			onPageChange={(selectedItem: { selected: number }) =>
				onPageChange(selectedItem.selected + 1)
			}
			activeClassName={'active'}
			activeLinkClassName={'active'}
			previousLabel={<BiChevronLeft />}
			previousClassName={'page-item'}
			previousLinkClassName={
				'page-link h-100 d-flex justify-content-center align-items-center'
			}
			nextLabel={<BiChevronRight />}
			nextClassName={'page-item'}
			nextLinkClassName={
				'page-link h-100 d-flex justify-content-center align-items-center'
			}
			disabledClassName={'disabled'}
			// extraAriaContext={'aria'}
			// hrefBuilder={(pageIndex: number) => null}
			// ariaLabelBuilder={(page, selected) =>
			// 	selected ? 'Current page' : 'Goto page ' + page
			// }
			// eventListener={'onMouseOver'}
		/>
	);
};
