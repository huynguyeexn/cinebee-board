export const localStorageGetItem = (item: string) => {
	if (window.localStorage.getItem(item) !== null) {
		const localToken = JSON.parse(window.localStorage.getItem(item) || '');
		if (localToken !== '') {
			return localToken;
		}
	}
	return null;
};
