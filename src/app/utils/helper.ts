import moment from 'moment';

export const makeRows = (length: number) => {
	const alpha = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
	const alphaLength = alpha.length;
	let count = 0;
	let result = [];
	do {
		if (count > 0) {
			for (let i = 0; i < count; i++) {
				for (let j = 0; j < (alphaLength > length ? length : alphaLength); j++) {
					result.push(`${alpha[i]}${alpha[j]}`);
				}
			}
		} else {
			for (let i = 0; i < (alphaLength > length ? length : alphaLength); i++) {
				result.push(alpha[i]);
			}
		}
		count++;
		length -= alphaLength;
	} while (length > 0);

	return result;
};

export const parseElementObjectToDate = (object: { [key: string]: any }, key: string) => {
	if (moment(object[`${key}`]).isValid()) {
		object[`${key}`] = moment(object[`${key}`]).toDate();
	} else {
		object[`${key}`] = undefined;
	}
	return object;
};

export const parseElementObjectToUTC = (object: { [key: string]: any }, key: string) => {
	if (moment(object[`${key}`]).isValid()) {
		object[`${key}`] = moment(object[`${key}`]).format();
	} else {
		object[`${key}`] = undefined;
	}
	return object;
};
