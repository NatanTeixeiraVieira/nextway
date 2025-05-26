import { activateAccount } from './activate-account';

export type ActivateAccountParams = {
	params: Promise<{
		token: string;
	}>;
};

export default async function ActivateAccountPage({
	params,
}: ActivateAccountParams) {
	await activateAccount({ params });
}
