'use client';

import { useForgotPassword } from './forgot-password.model';
import ForgotPasswordView from './forgot-password.view';
import { forgotPasswordService } from './services/forgot-password.service';

export default function ForgotPasswordPage() {
	const methods = useForgotPassword({ forgotPasswordService });

	return <ForgotPasswordView {...methods} />;
}
