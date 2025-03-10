import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import RecoverPasswordContent from './_components/recover-password-form';
import type { RecoverPasswordParams } from './page';

type RecoverPasswordViewProps = {
	params: RecoverPasswordParams['params'];
};

export default function RecoverPasswordView({
	params,
}: RecoverPasswordViewProps) {
	return (
		<div className="min-h-screen flex items-center bg-gradient-to-br from-sky-200 via-sky-300 to-sky-500 p-4">
			<div className="mx-auto w-full max-w-md">
				<div className="bg-white rounded-xl shadow-lg overflow-hidden">
					<div className="p-6 ">
						<Link
							href="/auth"
							className="inline-flex items-center text-sky-600 hover:text-sky-700 mb-6"
						>
							<ArrowLeft className="w-5 h-5 mr-2" />
							Voltar
						</Link>
						<h1 className="text-2xl font-semibold text-gray-800 mb-2">
							Redefinir senha
						</h1>
						<RecoverPasswordContent params={params} />
					</div>
				</div>
			</div>
		</div>
	);
}
