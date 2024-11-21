import Link from 'next/link';

export default function ProductsPagination({ page = 0, totalPages = 0 }) {
	const nextPage = page < totalPages ? page + 1 : totalPages;
	const prevPage = page > 1 ? page - 1 : 1;
	const isNextPageDisabled = page === totalPages;
	const isPrevPageDisabled = page === 1;
	const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
	console.log('page:', page);
	console.log(
		'currentpage: ',
		pages.find((currentPage) => currentPage === page),
	);

	return (
		<nav className="flex justify-center items-center py-10">
			<Link
				className={`bg-white px-4 py-2 text-sm ring-1 ring-inset ring-gray-300 focus:z-20 focus:outline-offset-0 ${isPrevPageDisabled ? 'text-slate-300 cursor-not-allowed' : 'text-gray-900 cursor-pointer '}`}
				href={`/admin/products?page=${prevPage}`}
			>
				&laquo;
			</Link>
			{pages.map((currentPage) => (
				<Link
					key={currentPage}
					href={`/admin/products?page=${currentPage}`}
					className={`bg-white px-4 py-2 text-sm ring-1 ring-inset ring-gray-300 focus:z-20 focus:outline-offset-0 ${currentPage === page ? 'bg-slate-300 text-slate-800' : 'text-slate-900'}`}
				>
					{currentPage}
				</Link>
			))}
			<Link
				className={`bg-white px-4 py-2 text-sm ring-1 ring-inset ring-gray-300 focus:z-20 focus:outline-offset-0 ${isNextPageDisabled ? 'text-slate-300 cursor-not-allowed' : 'text-gray-900 cursor-pointer'}`}
				href={`/admin/products?page=${nextPage}`}
			>
				&raquo;
			</Link>
		</nav>
	);
}
