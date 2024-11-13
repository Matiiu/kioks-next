import { prisma } from '@/src/lib/prisma';
import CategoryIcon from '../ui/CategoryIcon';
import Logo from '@/components/ui/Logo';

async function getCategories() {
	try {
		return await prisma.category.findMany();
	} catch (error) {
		console.error(error);
		return [];
	}
}

export default async function OrderSidebar() {
	const categories = await getCategories();

	return (
		<aside className="md:w-72 md:h-screen bg-white">
			<Logo />
			<nav className="mt-10">
				{!!categories.length &&
					categories.map((category) => (
						<CategoryIcon key={category.id} category={category} />
					))}
			</nav>
		</aside>
	);
}
