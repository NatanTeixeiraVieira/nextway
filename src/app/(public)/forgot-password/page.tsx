'use client';

import { forgotPasswordService } from './_services/forgot-password.service';
import { useForgotPassword } from './forgot-password.model';
import ForgotPasswordView from './forgot-password.view';

export default function ForgotPasswordPage() {
	const methods = useForgotPassword({ forgotPasswordService });

	return <ForgotPasswordView {...methods} />;
}
