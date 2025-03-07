'use client';

import { useActivateAccount } from './activate-account.model';
import ActivateAccountView from './activate-account.view';
import { activateAccountService } from './services/activate-account.service';

export type ActivateAccountParams = {
	params: Promise<{
		token: string;
	}>;
};

// TODO: Change the request to server side
export default function ActivateAccountPage({ params }: ActivateAccountParams) {
	const methods = useActivateAccount({
		params,
		activateAccountService,
	});

	return <ActivateAccountView {...methods} />;
}
