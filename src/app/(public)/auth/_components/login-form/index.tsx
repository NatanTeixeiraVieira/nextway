'use client';

import { useLoginForm } from './login-form.model';
import LoginFormView from './login-form.view';

export default function LoginForm() {
	const methods = useLoginForm();

	return <LoginFormView {...methods} />;
}
