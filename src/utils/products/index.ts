export function getImagePath(imagePath = '') {
	return imagePath.startsWith('https://res.cloudinary.com')
		? imagePath
		: `/products/${imagePath}.jpg`;
}
