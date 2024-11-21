'use client';
import Image from 'next/image';
import { useState } from 'react';
import { CldUploadWidget } from 'next-cloudinary';
import { TbPhotoPlus } from 'react-icons/tb';

export default function UploadImage() {
	const uploadPreset = process.env.NEXT_PUBLIC_UPLOAD_PRESET;
	const [imageUrl, setImageUrl] = useState('');

	return (
		<CldUploadWidget
			uploadPreset={uploadPreset}
			options={{
				maxFiles: 1,
			}}
			onSuccess={(result, { widget }) => {
				if (result.event === 'success' && typeof result.info === 'object') {
					console.log('result:', result);
					widget.close();
					setImageUrl(result.info?.secure_url || '');
				}
			}}
		>
			{({ open }) => (
				<>
					<div className="space-y-2">
						<label className="text-slate-800">Imagen Producto</label>
						<section
							className="relative cursor-pointer hover:opacity-70 transition p-10 border-neutral-300 flex flex-col justify-center items-center gap-4 text-neutral-600 bg-slate-100"
							onClick={() => open()}
						>
							<TbPhotoPlus size={50} />
							<p className="text-lg font-semibold">Agregar Imagen</p>

							{imageUrl && (
								<figure className="absolute inset-0 w-full h-full">
									<Image
										fill
										style={{ objectFit: 'contain' }}
										src={imageUrl}
										alt="Image Preview"
									/>
								</figure>
							)}
						</section>
					</div>

					<input type="hidden" name="image" value={imageUrl} />
				</>
			)}
		</CldUploadWidget>
	);
}
