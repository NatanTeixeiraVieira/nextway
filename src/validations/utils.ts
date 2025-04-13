import { z } from 'zod';

export const commonFieldSchema = (requiredMessage: string) =>
	z.string({ required_error: requiredMessage }).trim().min(1, requiredMessage);

export function isValidCPF(cpfMasked: string): boolean {
	// Remove caracteres não numéricos
	const cpf = cpfMasked.replace(/[^\d]+/g, '');

	// Verifica se tem 11 dígitos ou se todos os dígitos são iguais (ex: 111.111.111-11)
	if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false;

	// Validação do primeiro dígito verificador
	let sum = 0;
	for (let i = 0; i < 9; i++) {
		sum += Number.parseInt(cpf[i]) * (10 - i);
	}
	let firstCheckDigit = 11 - (sum % 11);
	if (firstCheckDigit >= 10) firstCheckDigit = 0;

	if (Number.parseInt(cpf[9]) !== firstCheckDigit) return false;

	// Validação do segundo dígito verificador
	sum = 0;
	for (let i = 0; i < 10; i++) {
		sum += Number.parseInt(cpf[i]) * (11 - i);
	}
	let secondCheckDigit = 11 - (sum % 11);
	if (secondCheckDigit >= 10) secondCheckDigit = 0;

	if (Number.parseInt(cpf[10]) !== secondCheckDigit) return false;

	return true;
}
