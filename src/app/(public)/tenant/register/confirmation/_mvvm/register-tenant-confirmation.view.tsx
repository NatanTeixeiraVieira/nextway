import type { useRegisterTenantConfirmation } from './register-tenant-confirmation.model';

import { Button } from '@/components/ui/button';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage,
} from '@/components/ui/form';
import {
	InputOTP,
	InputOTPGroup,
	InputOTPSlot,
} from '@/components/ui/input-otp';
import { RefreshCw } from 'lucide-react';

type RegisterTenantConfirmationProps = ReturnType<
	typeof useRegisterTenantConfirmation
>;

export default function RegisterTenantConfirmation(
	props: RegisterTenantConfirmationProps,
) {
	const { form, resendDisabled, countdown, handleResendCode, handleSubmit } =
		props;

	return (
		<div className="space-y-6">
			<Form {...form}>
				<form onSubmit={handleSubmit}>
					<div className="text-center mb-6">
						<h2 className="text-lg font-medium text-gray-800 mb-2">
							Verifique seu email
						</h2>
						<p className="text-gray-500 text-sm">
							Enviamos um código de 6 dígitos para email@email.com
						</p>
					</div>

					<div className="flex justify-center gap-2">
						<FormField
							control={form.control}
							name="pin"
							render={({ field }) => (
								<FormItem>
									<FormControl>
										<InputOTP
											maxLength={6}
											{...field}
											onChange={(value) => field.onChange(value.toUpperCase())}
										>
											{Array.from({ length: 6 }).map((_, index) => (
												<InputOTPGroup key={index.toString()}>
													<InputOTPSlot
														index={index}
														className="w-12 h-12 text-center text-lg font-bold border border-gray-300 rounded-lg focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
													/>
												</InputOTPGroup>
											))}
										</InputOTP>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>

					<div className="text-center my-4">
						{/* TODO Validate to don't let send code if reload the page */}
						<button
							type="button"
							onClick={handleResendCode}
							disabled={resendDisabled}
							className="text-sky-600 text-sm hover:text-sky-700 flex items-center justify-center mx-auto"
						>
							<RefreshCw className="w-4 h-4 mr-1" />
							{resendDisabled
								? `Reenviar código (${countdown}s)`
								: 'Reenviar código'}
						</button>
					</div>

					<Button
						type="submit"
						className="w-full bg-gradient-to-r from-sky-500 to-sky-600 py-0"
						data-testid="register-submit-button"
					>
						Enviar
					</Button>
				</form>
			</Form>

			{/* <div className="text-center py-6">
    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
      <CheckCircle2 className="w-8 h-8 text-green-500" />
    </div>
    <h2 className="text-xl font-semibold text-gray-800 mb-2">
      Cadastro concluído!
    </h2>
    <p className="text-gray-500 mb-6">
      Seu cadastro foi realizado com sucesso. Redirecionando...
    </p>
  </div>	 */}
		</div>
	);
}
