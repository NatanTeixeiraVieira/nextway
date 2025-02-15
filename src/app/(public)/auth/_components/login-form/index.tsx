'use client';

import { useLoginForm } from './login-form.model';
import LoginFormView from './login-form.view';
import { loginService } from './services/login.service';

export default function LoginForm() {
	const methods = useLoginForm({ loginService });

	return <LoginFormView {...methods} />;
}
