import { activateAccountService } from './_services/activate-account.service';
import { activateAccount } from './activate-account.model';

export type ActivateAccountParams = {
	params: Promise<{
		token: string;
	}>;
};

export default async function ActivateAccountPage({
	params,
}: ActivateAccountParams) {
	await activateAccount({ params, activateAccountService });
}
