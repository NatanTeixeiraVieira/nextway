'use client';

import { Eye, EyeOff, Lock, Mail } from 'lucide-react';
import type React from 'react';
import { type JSX, useState } from 'react';
import type {
	FormErrors,
	FormProps,
	RegisterFormData,
} from '../types/register-tenant.type';

export default function LoginForm({
	formData,
	updateFormData,
	nextStep,
	prevStep,
}: FormProps): JSX.Element {
	const [errors, setErrors] = useState<FormErrors>({});
	const [showPassword, setShowPassword] = useState<boolean>(false);

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
		e.preventDefault();

		// Validate form
		const newErrors: FormErrors = {};
		if (!formData.email) newErrors.email = 'Email é obrigatório';
		else if (!/\S+@\S+\.\S+/.test(formData.email))
			newErrors.email = 'Email inválido';

		if (!formData.password) newErrors.password = 'Senha é obrigatória';
		else if (formData.password.length < 6)
			newErrors.password = 'Senha deve ter pelo menos 6 caracteres';

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
					Email
				</label>
				<div className="relative">
					<Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
					<input
						type="email"
						name="email"
						placeholder="Digite seu email"
						value={formData.email}
						onChange={handleChange}
						className={`w-full pl-10 pr-4 py-3 rounded-xl border ${errors.email ? 'border-red-500' : 'border-gray-200'} focus:outline-none focus:border-sky-500`}
					/>
				</div>
				{errors.email && (
					<p className="text-red-500 text-xs mt-1">{errors.email}</p>
				)}
			</div>

			<div>
				<label className="block text-sm font-medium text-gray-700 mb-1">
					Senha
				</label>
				<div className="relative">
					<Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
					<input
						type={showPassword ? 'text' : 'password'}
						name="password"
						placeholder="Crie uma senha"
						value={formData.password}
						onChange={handleChange}
						className={`w-full pl-10 pr-12 py-3 rounded-xl border ${errors.password ? 'border-red-500' : 'border-gray-200'} focus:outline-none focus:border-sky-500`}
					/>
					<button
						type="button"
						className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
						onClick={() => setShowPassword(!showPassword)}
					>
						{showPassword ? (
							<EyeOff className="w-5 h-5" />
						) : (
							<Eye className="w-5 h-5" />
						)}
					</button>
				</div>
				{errors.password && (
					<p className="text-red-500 text-xs mt-1">{errors.password}</p>
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
