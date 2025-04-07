'use client';

import { Building2, Phone } from 'lucide-react';
import type React from 'react';
import { type JSX, useState } from 'react';
import type {
	FormErrors,
	FormProps,
	RegisterFormData,
} from '../types/register-tenant.type';

export default function EstablishmentForm({
	formData,
	updateFormData,
	nextStep,
	prevStep,
}: FormProps): JSX.Element {
	const [errors, setErrors] = useState<FormErrors>({});

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
		e.preventDefault();

		// Validate form
		const newErrors: FormErrors = {};
		if (!formData.cnpj) newErrors.cnpj = 'CNPJ é obrigatório';
		if (!formData.establishmentName)
			newErrors.establishmentName = 'Nome do estabelecimento é obrigatório';
		if (!formData.establishmentPhoneNumber)
			newErrors.establishmentPhoneNumber = 'Telefone é obrigatório';

		if (Object.keys(newErrors).length > 0) {
			setErrors(newErrors);
			return;
		}

		nextStep();
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
		const { name, value } = e.target;
		updateFormData({ [name as keyof RegisterFormData]: value });

		// Clear error when field is filled
		if (errors[name]) {
			setErrors((prev) => {
				const newErrors = { ...prev };
				delete newErrors[name];
				return newErrors;
			});
		}
	};

	return (
		<form onSubmit={handleSubmit} className="space-y-4">
			<div>
				<label className="block text-sm font-medium text-gray-700 mb-1">
					CNPJ
				</label>
				<input
					type="text"
					name="cnpj"
					placeholder="Digite o CNPJ"
					value={formData.cnpj}
					onChange={handleChange}
					className={`w-full px-4 py-3 rounded-xl border ${errors.cnpj ? 'border-red-500' : 'border-gray-200'} focus:outline-none focus:border-sky-500`}
					maxLength={18}
				/>
				{errors.cnpj && (
					<p className="text-red-500 text-xs mt-1">{errors.cnpj}</p>
				)}
			</div>

			<div>
				<label className="block text-sm font-medium text-gray-700 mb-1">
					Nome do estabelecimento
				</label>
				<div className="relative">
					<Building2 className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
					<input
						type="text"
						name="establishmentName"
						placeholder="Digite o nome do estabelecimento"
						value={formData.establishmentName}
						onChange={handleChange}
						className={`w-full pl-10 pr-4 py-3 rounded-xl border ${errors.establishmentName ? 'border-red-500' : 'border-gray-200'} focus:outline-none focus:border-sky-500`}
					/>
				</div>
				{errors.establishmentName && (
					<p className="text-red-500 text-xs mt-1">
						{errors.establishmentName}
					</p>
				)}
			</div>

			<div>
				<label className="block text-sm font-medium text-gray-700 mb-1">
					Telefone do estabelecimento
				</label>
				<div className="relative">
					<Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
					<input
						type="tel"
						name="establishmentPhoneNumber"
						placeholder="(00) 00000-0000"
						value={formData.establishmentPhoneNumber}
						onChange={handleChange}
						className={`w-full pl-10 pr-4 py-3 rounded-xl border ${errors.establishmentPhoneNumber ? 'border-red-500' : 'border-gray-200'} focus:outline-none focus:border-sky-500`}
						maxLength={15}
					/>
				</div>
				{errors.establishmentPhoneNumber && (
					<p className="text-red-500 text-xs mt-1">
						{errors.establishmentPhoneNumber}
					</p>
				)}
			</div>

			<div className="flex gap-4 mt-6">
				<button
					type="button"
					onClick={prevStep}
					className="w-full bg-gray-100 text-gray-700 py-3 rounded-xl font-medium
                   hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2
                   transition-colors"
				>
					Voltar
				</button>
				<button
					type="submit"
					className="w-full bg-sky-500 text-white py-3 rounded-xl font-medium
                   hover:bg-sky-600 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2
                   transition-colors"
				>
					Próximo
				</button>
			</div>
		</form>
	);
}
