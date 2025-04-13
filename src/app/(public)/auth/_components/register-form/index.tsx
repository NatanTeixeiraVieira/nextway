'use client';

import { registerService } from './_services/register.service';
import { useRegisterForm } from './register-form.model';
import RegisterFormView from './register-form.view';

export default function RegisterForm() {
	const methods = useRegisterForm({
		registerService,
	});

	return <RegisterFormView {...methods} />;
}
