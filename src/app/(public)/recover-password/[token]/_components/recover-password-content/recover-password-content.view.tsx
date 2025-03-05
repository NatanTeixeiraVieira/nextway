import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import type { useRecoverPassword } from './recover-password-content.model';

type RecoverPasswordViewProps = ReturnType<typeof useRecoverPassword>;

export default function RecoverPasswordView(props: RecoverPasswordViewProps) {
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
		<div className="min-h-screen flex items-center bg-gradient-to-br from-sky-200 via-sky-300 to-sky-500 p-4">
			<div className="mx-auto w-full max-w-md">
				<div className="bg-white rounded-xl shadow-lg overflow-hidden">
					<div className="p-6 ">
						<Link
							href="/auth"
							className="inline-flex items-center text-sky-600 hover:text-sky-700 mb-6"
						>
							<ArrowLeft className="w-5 h-5 mr-2" />
							Voltar
						</Link>
						<h1 className="text-2xl font-semibold text-gray-800 mb-2">
							Redefinir senha
						</h1>

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
					</div>
				</div>
			</div>
		</div>
	);
}
