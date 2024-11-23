import colors from 'colors';

const defaultSuccessStyle = (str = '') => colors.bgGreen.bold(str).white;
const defaultWarningStyle = (str = '') => colors.bgYellow.bold(str).white;
const defaultErrorStyle = (str = '') => colors.bgRed.bold(str).white;

export function consoleSuccess(message = 'Success', data: unknown = null) {
	console.log(defaultSuccessStyle(message));
	if (data) {
		console.log(defaultSuccessStyle(JSON.stringify(data, null, 2)));
	}
}

export function consoleWarning(message = 'Warning', data: unknown = null) {
	console.warn(defaultWarningStyle(message));
	if (data) {
		console.warn(defaultWarningStyle(JSON.stringify(data, null, 2)));
	}
}

export function consoleError(message = 'Error', data: unknown = null) {
	console.error(defaultErrorStyle(message));
	if (data) {
		console.error(defaultErrorStyle(JSON.stringify(data, null, 2)));
	}
}
