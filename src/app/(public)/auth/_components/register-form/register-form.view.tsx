import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import type { usRegisterForm } from './register-form.model';

type RegisterFormViewProps = ReturnType<typeof usRegisterForm>;

export default function RegisterFormView(props: RegisterFormViewProps) {
	const {
		errors,
		passwordInputType,
		dirtyFields,
		handleSubmit,
		register,
		handleIconEyeClick,
	} = props;

	return (
		<form onSubmit={handleSubmit} className="w-full space-y-6">
			<div className="space-y-2">
				<Label htmlFor="name">Name</Label>
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
			<Button
				type="submit"
				// disabled={isLoading}
				className="w-full bg-gradient-to-r from-sky-500 to-sky-600"
			>
				{/* {isLoading ? 'Logging in...' : 'Log in'} */}
				Entrar
			</Button>
		</form>
	);
}
