import { Input, InputContainer } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import ActionButtons from '../../_components/action-buttons';
import type { useRegisterTenantLogin } from './register-tenant-login.model';

type RegisterTenantLoginViewProps = ReturnType<typeof useRegisterTenantLogin>;

export default function RegisterTenantLoginView(
	props: RegisterTenantLoginViewProps,
) {
	const {
		dirtyFields,
		errors,
		passwordInputType,
		handleIconEyeClick,
		handleSubmit,
		register,
	} = props;

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

			<ActionButtons />
		</form>
	);
}
