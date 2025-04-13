'use client';

import { loginService } from './_services/login.service';
import { useLoginForm } from './login-form.model';
import LoginFormView from './login-form.view';

export default function LoginForm() {
	const methods = useLoginForm({ loginService });

	return <LoginFormView {...methods} />;
}
