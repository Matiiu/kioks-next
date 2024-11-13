import Image from 'next/image';
export default function Logo() {
	return (
		<div className="flex justify-center mt-5">
			<figure className="relative w-40 h-40">
				<Image fill src="/logo.svg" alt="Fresh Coffee Logo" />
			</figure>
		</div>
	);
}
