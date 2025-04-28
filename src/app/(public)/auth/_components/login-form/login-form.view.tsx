import Spinner from '@/components/spinner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Link from 'next/link';
import type { useLoginForm } from './login-form.model';

type LoginFormViewProps = ReturnType<typeof useLoginForm>;

export default function LoginFormView(props: LoginFormViewProps) {
	const {
		errors,
		passwordInputType,
		dirtyFields,
		isPending,
		handleSubmit,
		register,
		handleIconEyeClick,
	} = props;

	return (
		<form onSubmit={handleSubmit} className="w-full space-y-6">
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
				<Label htmlFor="password">Password</Label>
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
			<div className="flex items-center justify-between">
				<Link
					href="/forgot-password"
					className="text-sky-700 text-sm transition-colors hover:text-sky-600"
				>
					Esqueceu a sua senha?
				</Link>
			</div>
			<Button
				type="submit"
				disabled={isPending}
				className="w-full bg-gradient-to-r from-sky-500 to-sky-600"
				data-testid="login-submit-button"
			>
				{isPending && <Spinner />}
				{!isPending && 'Entrar'}
			</Button>
		</form>
	);
}
