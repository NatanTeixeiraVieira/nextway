'use client';

import { Button } from '@/components/ui/button';
import { Input, InputContainer } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cpfMask, phoneNumberMask } from '@/utils/masks';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import type React from 'react';
import type { JSX } from 'react';
import { useForm } from 'react-hook-form';
import { registerTenantResponsibleSchema } from './schemas/register-tenant-responsible.schema';
import type { RegisterTenantResponsibleFormData } from './types/register-tenant-responsible-form-data.type';

export default function ResponsibleForm(): JSX.Element {
	const router = useRouter();

	const {
		register,
		handleSubmit: submit,
		formState: { errors },
		setValue,
	} = useForm<RegisterTenantResponsibleFormData>({
		resolver: zodResolver(registerTenantResponsibleSchema),
		defaultValues: {
			name: '',
			cpf: '',
			phoneNumber: '',
		},
	});

	const handleCpfChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const cpfMasked = cpfMask(event.target.value);
		setValue('cpf', cpfMasked);
	};

	const handlePhoneNumberChange = (
		event: React.ChangeEvent<HTMLInputElement>,
	) => {
		const phoneNumberMasked = phoneNumberMask(event.target.value);
		setValue('phoneNumber', phoneNumberMasked);
	};

	const handleSubmit = submit((data) => {
		const storedData = sessionStorage.getItem('register-tenant');
		if (!storedData) return;

		const parsedStoredData = JSON.parse(storedData);

		sessionStorage.setItem(
			'register-tenant',
			JSON.stringify({ ...parsedStoredData, ...data }),
		);

		router.push('/tenant/register/establishment');
	});

	return (
		<form onSubmit={handleSubmit} className="space-y-4">
			<InputContainer>
				<Label htmlFor="name">Nome do responsável</Label>
				<Input
					id="name"
					type="text"
					placeholder="Exemplo: João da Silva"
					{...register('name')}
					helperText={errors.name?.message}
				/>
			</InputContainer>

			<InputContainer>
				<Label htmlFor="cpf">CPF do responsável</Label>
				<Input
					id="cpf"
					type="text"
					placeholder="Exemplo: 111.222.333-44"
					{...register('cpf', { onChange: handleCpfChange })}
					helperText={errors.cpf?.message}
				/>
			</InputContainer>

			<InputContainer>
				<Label htmlFor="phoneNumber">Telefone do responsável</Label>
				<Input
					id="phoneNumber"
					type="text"
					placeholder="Exemplo: +55 (00) 91111-2222"
					{...register('phoneNumber', { onChange: handlePhoneNumberChange })}
					helperText={errors.phoneNumber?.message}
				/>
			</InputContainer>

			<Button
				type="submit"
				className="w-full bg-gradient-to-r from-sky-500 to-sky-600 py-0"
				data-testid="register-submit-button"
			>
				Próximo
			</Button>
		</form>
	);
}
