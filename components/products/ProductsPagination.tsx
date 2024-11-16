import Link from 'next/link';

export default function ProductsPagination({ page = 0, totalPages = 0 }) {
	const nextPage = page < totalPages ? page + 1 : totalPages;
	const prevPage = page > 1 ? page - 1 : 1;
	const isNextPageDisabled = page === totalPages;
	const isPrevPageDisabled = page === 1;

	return (
		<nav className="flex justify-center py-10 gap-10">
			<Link
				className={`text-2xl ${isPrevPageDisabled ? 'text-slate-400 cursor-not-allowed' : 'cursor-pointer'}`}
				href={`/admin/products?page=${prevPage}`}
			>
				&laquo;
			</Link>
			<Link
				className={`text-2xl ${isNextPageDisabled ? 'text-slate-400 cursor-not-allowed' : 'cursor-pointer'}`}
				href={`/admin/products?page=${nextPage}`}
			>
				&raquo;
			</Link>
		</nav>
	);
}
