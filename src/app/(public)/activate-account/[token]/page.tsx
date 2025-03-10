import { activateAccount } from './activate-account.model';
import { activateAccountService } from './services/activate-account.service';

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
