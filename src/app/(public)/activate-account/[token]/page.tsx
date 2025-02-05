'use client';

import { useActivateAccount } from './activate-account.model';
import ActivateAccountView from './activate-account.view';
import { activateAccountService } from './services/activate-account.service';

export type ActivateAccountParams = {
	params: Promise<{
		token: string;
	}>;
};

export default function ActivateAccount({ params }: ActivateAccountParams) {
	const methods = useActivateAccount({
		params,
		activateAccountService,
	});

	return <ActivateAccountView {...methods} />;
}
