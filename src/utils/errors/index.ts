import { type ResponseSchema } from '@/src/types/errors';

export function responseSchema({
	errors = [],
	error = '',
	success = '',
}: ResponseSchema) {
	return { errors, error, success };
}
