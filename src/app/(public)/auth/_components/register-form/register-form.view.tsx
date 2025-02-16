import Spinner from '@/components/spinner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import type { useRegisterForm } from './register-form.model';

type RegisterFormViewProps = ReturnType<typeof useRegisterForm>;

export default function RegisterFormView(props: RegisterFormViewProps) {
	const {
		errors,
		passwordInputType,
		dirtyFields,
		confirmPasswordInputType,
		isPending,
		handleConfirmPasswordIconEyeClick,
		handleSubmit,
		register,
		handleIconEyeClick,
	} = props;

	return (
		<form onSubmit={handleSubmit} className="w-full space-y-6">
			<div className="space-y-2">
				<Label htmlFor="name">Nome</Label>
				<Input
					id="name"
					type="text"
					placeholder="Digite seu nome"
					{...register('name')}
					helperText={errors.name?.message}
				/>
			</div>
			<div className="space-y-2">
				<Label htmlFor="email">Email</Label>
				<Input
					id="email"
					type="email"
					placeholder="email@gmail.com"
					{...register('email')}
					helperText={errors.email?.message}
				/>
			</div>
			<div className="space-y-2">
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
			</div>
			<div className="space-y-2">
				<Label htmlFor="confirmPassword">Confirmação da senha</Label>
				<Input
					id="confirmPassword"
					type={confirmPasswordInputType}
					placeholder="Digite a confirmação da senha"
					{...register('confirmPassword')}
					isDirty={dirtyFields.confirmPassword}
					onIconEyeClick={handleConfirmPasswordIconEyeClick}
					isEyeOpen={confirmPasswordInputType === 'password'}
					helperText={errors.confirmPassword?.message}
				/>
			</div>
			<Button
				type="submit"
				disabled={isPending}
				className="w-full bg-gradient-to-r from-sky-500 to-sky-600 py-0"
				data-testid="register-submit-button"
			>
				{isPending && <Spinner />}
				{!isPending && 'Cadastrar-se'}
			</Button>
		</form>
	);
}
