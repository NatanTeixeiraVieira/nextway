'use client';

import { usRegisterForm } from './register-form.model';
import { default as RegisterFormView } from './register-form.view';

export default function RegisterForm() {
	const methods = usRegisterForm();

	return <RegisterFormView {...methods} />;
}
