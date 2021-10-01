import { RcFile } from 'antd/lib/upload';
import moment from 'moment';

moment.locale('vi');

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

export const ageRatingColor = (rating?: string): string => {
	if (!rating) return '';
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

export const stringToSlug = (string: string) => {
	const a = 'àáäâãåăæąçćčđďèéěėëêęğǵḧìíïîįłḿǹńňñòóöôœøṕŕřßşśšșťțùúüûǘůűūųẃẍÿýźžż·/_,:;';
	const b = 'aaaaaaaaacccddeeeeeeegghiiiiilmnnnnooooooprrsssssttuuuuuuuuuwxyyzzz------';
	const p = new RegExp(a.split('').join('|'), 'g');
	return string
		.toString()
		.toLowerCase()
		.replace(/á|à|ả|ạ|ã|ă|ắ|ằ|ẳ|ẵ|ặ|â|ấ|ầ|ẩ|ẫ|ậ/gi, 'a')
		.replace(/é|è|ẻ|ẽ|ẹ|ê|ế|ề|ể|ễ|ệ/gi, 'e')
		.replace(/i|í|ì|ỉ|ĩ|ị/gi, 'i')
		.replace(/ó|ò|ỏ|õ|ọ|ô|ố|ồ|ổ|ỗ|ộ|ơ|ớ|ờ|ở|ỡ|ợ/gi, 'o')
		.replace(/ú|ù|ủ|ũ|ụ|ư|ứ|ừ|ử|ữ|ự/gi, 'u')
		.replace(/ý|ỳ|ỷ|ỹ|ỵ/gi, 'y')
		.replace(/đ/gi, 'd')
		.replace(/\s+/g, '-')
		.replace(p, (c) => b.charAt(a.indexOf(c)))
		.replace(/&/g, '-and-')
		.replace(/[^\w\\-]+/g, '')
		.replace(/\\-\\-+/g, '-')
		.replace(/^-+/, '')
		.replace(/-+$/, '')
		.replace(/-+/g, '-');
};

export const minutesToHoursMinutes = (minutes: number): string => {
	return moment
		.utc(moment.duration(minutes, 'minutes').asMilliseconds())
		.format('H [giờ] mm [phút]');
};

export const imageUrl = (folder: string, file_name: string): string => {
	return `${process.env.REACT_APP_SERVER_URL}/${folder}${file_name}`;
};
