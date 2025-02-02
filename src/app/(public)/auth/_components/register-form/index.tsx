'use client';

import { useRegisterForm } from './register-form.model';
import RegisterFormView from './register-form.view';

export default function RegisterForm() {
	const methods = useRegisterForm();

	return <RegisterFormView {...methods} />;
}
