export function validateEmptyInput(formData) {
	let errObject = [];
	for (let field in formData.target) {
		if (field.required && field.value === '') {
			errObject.push(field.name);
		}
	}
	return errObject;
}
