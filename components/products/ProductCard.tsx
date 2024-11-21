import { type Product } from '@prisma/client';
import { formatCurrency } from '@/src/utils/currency';
import Image from 'next/image';
import AddProductButton from '@/components/products/AddProductButton';
import { getImagePath } from '@/src/utils/products';

type ProductCardProps = {
	product: Product;
};

export default function ProductCard({ product }: ProductCardProps) {
	return (
		<div className="border bg-white">
			<Image
				src={getImagePath(product.image)}
				alt={`${product.name} Image`}
				width={400}
				height={500}
				loading="lazy"
			/>
			<div className="p-5">
				<h3 className="text-2xl font-bold">{product.name}</h3>
				<p className="mt-5 font-black text-4xl text-amber-500">
					{formatCurrency(product.price)}
				</p>
				<AddProductButton product={product} />
			</div>
		</div>
	);
}
