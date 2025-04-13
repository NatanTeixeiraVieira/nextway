import { redirect } from 'next/navigation';
import type { ActivateAccountService } from './_types/activate-account.type';
import type { ActivateAccountParams } from './page';

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
