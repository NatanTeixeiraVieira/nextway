import { redirect } from 'next/navigation';
import { activateAccountService } from './_services/activate-account.service';
import type { ActivateAccountParams } from './page';

type ActivateAccountModelProps = {
	params: ActivateAccountParams['params'];
};

export const activateAccount = async ({
	params,
}: ActivateAccountModelProps) => {
	const { token } = await params;
	await activateAccountService.checkEmail({ token });
	redirect('/');
};
