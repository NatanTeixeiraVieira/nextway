import { CookiesName } from '@/constants/cookies';
import { cookies } from 'next/headers';
import PaymentForm from './_components/payment-form';

export default async function TenantPaymentPage() {
	const cookiesStore = await cookies();
	const tenantId =
		cookiesStore.get(CookiesName.TENANT_ACCESS_TOKEN)?.value ?? '';

	// if (!tenantId) {
	// 	redirect('/');
	// }

	return (
		<div className="min-h-screen bg-gradient-to-br from-sky-200 via-sky-300 to-sky-500 p-4">
			<div className="max-w-md mx-auto">
				<div className="bg-white rounded-xl shadow-lg overflow-hidden min-h-[37rem]">
					<div className="p-6">
						<div className="flex items-center mb-6">
							<h1 className="text-2xl font-semibold text-gray-800">
								Dados do Cartão
							</h1>
						</div>

						<PaymentForm tenantId={tenantId} />
					</div>
				</div>
			</div>
		</div>
	);
}
