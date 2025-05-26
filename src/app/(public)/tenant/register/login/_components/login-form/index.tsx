'use client';

import Spinner from '@/components/spinner';
import { Input, InputContainer } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import ActionButtons from '../../../_components/action-buttons';
import type { RegisterTenatFormData } from '../../../_types/register-tenant.type';
import { useRegisterTenantLogin } from './register-tenant-login';

export type RegisterTenantLoginFormProps = {
	loginData: RegisterTenatFormData | null;
};

export default function RegisterTenantLoginForm({
	loginData,
}: RegisterTenantLoginFormProps) {
	const {
		dirtyFields,
		errors,
		passwordInputType,
		isPending,
		handleIconEyeClick,
		handleSubmit,
		register,
	} = useRegisterTenantLogin({ loginData });

	return (
		<form onSubmit={handleSubmit} className="space-y-4">
			<InputContainer>
				<Label htmlFor="email">Email</Label>
				<Input
					id="email"
					type="text"
					placeholder="Exemplo: joao@gmail.com"
					{...register('email')}
					helperText={errors.email?.message}
				/>
			</InputContainer>

			<InputContainer>
				<Label htmlFor="password">Senha</Label>
				<Input
					id="password"
					type={passwordInputType}
					placeholder="Digite sua senha"
					{...register('password')}
					isDirty={dirtyFields.password}
					onIconEyeClick={handleIconEyeClick}
					isEyeOpen={passwordInputType === 'password'}
					helperText={errors.password?.message}
				/>
			</InputContainer>

			<ActionButtons
				nextStepButtonContent={isPending ? <Spinner /> : 'Verificar'}
			/>
		</form>
	);
}
