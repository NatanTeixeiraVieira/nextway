import { redirect } from 'next/navigation';
import type { ActivateAccountParams } from './page';
import type { ActivateAccountService } from './types/activate-account.type';

type ActivateAccountModelProps = {
	params: ActivateAccountParams['params'];
	activateAccountService: ActivateAccountService;
};

export const activateAccount = async ({
	params,
	activateAccountService,
}: ActivateAccountModelProps) => {
	const { token } = await params;
	await activateAccountService.checkEmail({ token });
	redirect('/');
};
