import { recoverPasswordService } from './_services/recover-password.service';
import type { RecoverPasswordParams } from './page';

type RecoverPasswordModelProps = {
	params: RecoverPasswordParams['params'];
};

export const recoverPassword = async ({
	params,
}: RecoverPasswordModelProps) => {
	const { token } = await params;

	await recoverPasswordService.verifyToken({ token });
};
