import type { RecoverPasswordService } from './_types/recover-password.type';
import type { RecoverPasswordParams } from './page';

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
