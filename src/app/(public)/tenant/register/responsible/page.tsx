'use client';

import { Phone, User } from 'lucide-react';
import type React from 'react';
import { type JSX, useState } from 'react';
import type {
	FormErrors,
	FormProps,
	RegisterFormData,
} from '../types/register-tenant.type';

export default function ResponsibleForm({
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
		if (!formData.name) newErrors.name = 'Nome é obrigatório';
		if (!formData.cpf) newErrors.cpf = 'CPF é obrigatório';
		if (!formData.responsiblePhoneNumber)
			newErrors.responsiblePhoneNumber = 'Telefone é obrigatório';

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
					Nome completo
				</label>
				<div className="relative">
					<User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
					<input
						type="text"
						name="name"
						placeholder="Digite seu nome completo"
						value={formData.name}
						onChange={handleChange}
						className={`w-full pl-10 pr-4 py-3 rounded-xl border ${errors.name ? 'border-red-500' : 'border-gray-200'} focus:outline-none focus:border-sky-500`}
					/>
				</div>
				{errors.name && (
					<p className="text-red-500 text-xs mt-1">{errors.name}</p>
				)}
			</div>

			<div>
				<label className="block text-sm font-medium text-gray-700 mb-1">
					CPF
				</label>
				<input
					type="text"
					name="cpf"
					placeholder="Digite seu CPF"
					value={formData.cpf}
					onChange={handleChange}
					className={`w-full px-4 py-3 rounded-xl border ${errors.cpf ? 'border-red-500' : 'border-gray-200'} focus:outline-none focus:border-sky-500`}
					maxLength={14}
				/>
				{errors.cpf && (
					<p className="text-red-500 text-xs mt-1">{errors.cpf}</p>
				)}
			</div>

			<div>
				<label className="block text-sm font-medium text-gray-700 mb-1">
					Telefone
				</label>
				<div className="relative">
					<Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
					<input
						type="tel"
						name="responsiblePhoneNumber"
						placeholder="(00) 00000-0000"
						value={formData.responsiblePhoneNumber}
						onChange={handleChange}
						className={`w-full pl-10 pr-4 py-3 rounded-xl border ${errors.responsiblePhoneNumber ? 'border-red-500' : 'border-gray-200'} focus:outline-none focus:border-sky-500`}
						maxLength={15}
					/>
				</div>
				{errors.responsiblePhoneNumber && (
					<p className="text-red-500 text-xs mt-1">
						{errors.responsiblePhoneNumber}
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
