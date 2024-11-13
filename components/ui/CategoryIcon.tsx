'use client';
import { useParams } from 'next/navigation';
import { type Category } from '@prisma/client';
import Link from 'next/link';
import Image from 'next/image';

type CategoryIconProps = {
	category: Category;
};
export default function CategoryIcon({ category }: CategoryIconProps) {
	const params = useParams();
	const isCurrentCategory = category.slug === params?.category;

	return (
		<div
			className={`${isCurrentCategory ? 'bg-amber-400' : ''} flex items-center gap-4 w-full border-t border-gray-200 p-3 last-of-type:border-b`}
		>
			<figure className="w-16 h-16 relative">
				<Image
					src={`/icon_${category.slug}.svg`}
					alt={`Image/${category.name}`}
					fill
				/>
			</figure>

			<Link href={`/order/${category.slug}`} className="text-xl font-bold">
				{category.name}
			</Link>
		</div>
	);
}
