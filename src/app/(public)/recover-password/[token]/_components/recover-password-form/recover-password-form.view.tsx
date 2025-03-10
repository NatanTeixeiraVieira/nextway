import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import type { useRecoverPasswordForm } from './recover-password-form.model';

type RecoverPasswordFormViewProps = ReturnType<typeof useRecoverPasswordForm>;

export default function RecoverPasswordFormView(
	props: RecoverPasswordFormViewProps,
) {
	const {
		passwordInputType,
		confirmPasswordInputType,
		errors,
		dirtyFields,
		handleSubmit,
		register,
		handleConfirmPasswordIconEyeClick,
		handleIconEyeClick,
	} = props;

	return (
		<form onSubmit={handleSubmit} noValidate className="space-y-4">
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
				// disabled={isPending}
				className="w-full bg-gradient-to-r from-sky-500 to-sky-600 py-0"
			>
				Recuperar
				{/* {!isPending && 'Recuperar'}
									{isPending && <Spinner />} */}
			</Button>
		</form>
	);
}
