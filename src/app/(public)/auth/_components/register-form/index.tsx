'use client';

import { useRegisterForm } from './register-form.model';
import RegisterFormView from './register-form.view';
import { registerService } from './services/register.service';

export default function RegisterForm() {
	const methods = useRegisterForm({
		registerService,
	});

	return <RegisterFormView {...methods} />;
}
