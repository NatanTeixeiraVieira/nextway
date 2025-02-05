import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { use, useEffect } from 'react';
import type { ActivateAccountParams } from './page';
import type { ActivateAccountService } from './types/activate-account.type';

type ActivateAccountModelProps = {
	params: ActivateAccountParams['params'];
	activateAccountService: ActivateAccountService;
};

export const useActivateAccount = ({
	params,
	activateAccountService,
}: ActivateAccountModelProps) => {
	const { token } = use(params);
	const router = useRouter();

	const { mutate, isPending, error } = useMutation({
		mutationFn: activateAccountService.checkEmail,
		onSuccess: () => {
			router.push('/');
		},
	});

	useEffect(() => {
		mutate({ token });
	}, [token, mutate]);

	return {
		isPending,
		error,
	};
};
