import type { AppError } from '@/errors/error';
import { useToast } from '@/hooks/use-toast';
import { requestErrorHandling } from '@/utils/error-handling';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import type { LogoutService } from './types/logout.type';

export type SidebarModelProps = {
	logoutService: LogoutService;
};

export const useSidebar = ({ logoutService }: SidebarModelProps) => {
	const { toast } = useToast();
	const router = useRouter();

	const { mutateAsync } = useMutation({
		mutationFn: logoutService.logout,
		onSuccess: () => {
			router.push('/auth');
		},

		onError: (error: AppError) => {
			toast({
				variant: 'destructive',
				className: 'logout-send-email-toast-error',
				title: requestErrorHandling(error, 'Falha ao sair.'),
			});
		},
	});

	const handleButtonLogoutClick = async () => {
		await mutateAsync();
	};

	return {
		handleButtonLogoutClick,
	};
};
