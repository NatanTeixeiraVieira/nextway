import Spinner from '@/components/spinner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowLeft, Mail } from 'lucide-react';
import Link from 'next/link';
import type { useForgotPassword } from './forgot-password.model';

type ForgotPasswordViewProps = ReturnType<typeof useForgotPassword>;

export default function ForgotPasswordView(props: ForgotPasswordViewProps) {
	const { isPending, isSuccess, errors, handleSubmit, register } = props;

	return (
		<div className="min-h-screen flex items-center bg-gradient-to-br from-sky-200 via-sky-300 to-sky-500 p-4">
			<div className="max-w-md mx-auto">
				{!isSuccess && (
					<div className="bg-white rounded-xl shadow-lg overflow-hidden">
						<div className="p-6">
							<Link
								href="/auth"
								className="inline-flex items-center text-sky-600 hover:text-sky-700 mb-6"
							>
								<ArrowLeft className="w-5 h-5 mr-2" />
								Voltar
							</Link>
							<h1 className="text-2xl font-semibold text-gray-800 mb-2">
								Esqueceu sua senha?
							</h1>
							<p className="text-gray-500 text-sm mb-6">
								Digite seu e-mail para receber um link de recuperação de senha
							</p>

							<form onSubmit={handleSubmit} noValidate className="space-y-4">
								<div className="relative">
									<Input
										leftContent={
											<Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
										}
										id="email"
										className="pl-10"
										type="email"
										placeholder="email@gmail.com"
										{...register('email')}
										helperText={errors.email?.message}
									/>
								</div>

								<Button
									type="submit"
									disabled={isPending}
									className="w-full bg-gradient-to-r from-sky-500 to-sky-600 py-0"
								>
									{!isPending && 'Enviar link de recuperação'}
									{isPending && <Spinner />}
								</Button>
							</form>
						</div>
					</div>
				)}

				{isSuccess && (
					<div className="bg-white rounded-xl shadow-lg p-6 text-center">
						<div className="w-12 h-12 bg-sky-100 rounded-full flex items-center justify-center mx-auto mb-4">
							<Mail className="w-6 h-6 text-sky-500" />
						</div>
						<h2 className="text-xl font-semibold text-gray-800 mb-2">
							E-mail enviado!
						</h2>
						<p className="text-gray-500 mb-6">
							Verifique sua caixa de entrada para recuperar sua senha
						</p>
					</div>
				)}
			</div>
		</div>
	);
}
