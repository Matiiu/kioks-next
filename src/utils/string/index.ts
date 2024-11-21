export function normalizeSpaces(str = '') {
	return str.replace(/\s+/g, ' ').trim();
}

export function normalizeText(str = '') {
	str = normalizeSpaces(str).toLocaleLowerCase();
	return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}
