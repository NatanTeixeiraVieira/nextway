import RecoverPasswordContent from './_components/recover-password-content';
import { recoverPassword } from './recover-password.model';
import { recoverPasswordService } from './services/recover-password.service';

export type RecoverPasswordParams = {
	params: Promise<{
		token: string;
	}>;
};

export default async function RecoverPasswordPage({
	params,
}: RecoverPasswordParams) {
	await recoverPassword({ params, recoverPasswordService });

	return <RecoverPasswordContent params={params} />;
}
