import { RcFile } from 'antd/lib/upload';
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

export const ageRatingColor = (rating: string): string => {
	switch (rating.toLowerCase()) {
		case 'p':
			return '#87d068';
		case 'c13':
			return '#2db7f5';
		case 'c16':
			return '#7f2df5';
		case 'c18':
			return '#f50';
		default:
			return '';
	}
};

export const getBase64 = (file: RcFile) => {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = () => resolve(reader.result);
		reader.onerror = (error) => reject(error);
	});
};
