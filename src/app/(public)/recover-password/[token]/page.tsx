import { recoverPasswordService } from './_services/recover-password.service';
import { recoverPassword } from './recover-password.model';
import RecoverPasswordView from './recover-password.view';

export type RecoverPasswordParams = {
	params: Promise<{
		token: string;
	}>;
};

export default async function RecoverPasswordPage({
	params,
}: RecoverPasswordParams) {
	await recoverPassword({ params, recoverPasswordService });

	return <RecoverPasswordView params={params} />;
}
