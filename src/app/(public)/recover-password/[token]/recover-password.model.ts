import type { RecoverPasswordParams } from './page';
import type { RecoverPasswordService } from './types/recover-password.type';

type RecoverPasswordModelProps = {
	params: RecoverPasswordParams['params'];
	recoverPasswordService: RecoverPasswordService;
};

export const recoverPassword = async ({
	params,
	recoverPasswordService,
}: RecoverPasswordModelProps) => {
	const { token } = await params;

	await recoverPasswordService.verifyToken({ token });
};
