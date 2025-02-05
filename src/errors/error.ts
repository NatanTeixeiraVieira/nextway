export class AppError extends Error {
	constructor(
		readonly statusCode: number,
		readonly error: string,
		message: string,
	) {
		super();
		this.message = message;
	}
}
