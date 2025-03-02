'use client';

import { useRecoverPassword } from './recover-password.model';
import RecoverPasswordView from './recover-password.view';
import { recoverPasswordService } from './services/recover-password.service';

export type RecoverPasswordParams = {
	params: Promise<{
		token: string;
	}>;
};

// TODO: Remove use client and make the recover password by server
export default function RecoverPasswordPage({ params }: RecoverPasswordParams) {
	const methods = useRecoverPassword({ params, recoverPasswordService });

	return <RecoverPasswordView {...methods} />;
}
