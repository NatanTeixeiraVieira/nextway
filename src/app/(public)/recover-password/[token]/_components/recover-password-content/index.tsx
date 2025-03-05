'use client';

import { recoverPasswordService } from '../../services/recover-password.service';
import { useRecoverPassword } from './recover-password-content.model';
import RecoverPasswordView from './recover-password-content.view';

export type RecoverPasswordProps = {
	params: Promise<{
		token: string;
	}>;
};

export default function RecoverPasswordContent({
	params,
}: RecoverPasswordProps) {
	const methods = useRecoverPassword({ params, recoverPasswordService });

	return <RecoverPasswordView {...methods} />;
}
