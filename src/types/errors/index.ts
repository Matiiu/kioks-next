export type ErrorMessage = {
	message: string;
};

export type ResponseSchema = {
	errors?: ErrorMessage[];
	error?: string;
	success?: string;
};
