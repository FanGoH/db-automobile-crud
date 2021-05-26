export const objectKeysToString = (dataObject: Object) => {
	const fields = Object.keys(dataObject);

	let fieldsInString = fields.reduce((prev, curr) => prev + curr + ",", "");

	return fieldsInString.substring(0, fieldsInString.length - 1);
};

export const objectValuesToString = (dataObject: Object) => {
	const values = Object.values(dataObject);

	let valuesInString = values.reduce((prev, curr) => {
		if (typeof curr === "string") {
			return `${prev} "${curr}",`;
		}

		return prev + curr + ",";
	}, "");

	return valuesInString.substring(0, valuesInString.length - 1);
};

export const prepareObjectsForQuery = (dataObject: Object) => {
	const keys = objectKeysToString(dataObject);
	const values = objectValuesToString(dataObject);

	return { keys, values };
};
