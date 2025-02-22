import type { Metadata } from 'next';
import './globals.css';

import { Toaster } from '@/components/ui/toaster';
import Providers from '@/providers/providers';
import { Poppins } from 'next/font/google';

const poppins = Poppins({
	subsets: ['latin'],
	weight: ['400', '700'],
});

export const metadata: Metadata = {
	title: {
		template: '%s - NextWay',
		default: 'NextWay',
	},

	description:
		'Descubra o sistema de delivery multi-tenant mais eficiente! Gerencie pedidos, produtos, categorias e áreas de entrega em um só lugar. Ideal para negócios que desejam expandir com tecnologia de ponta.',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="pt-BR" className={poppins.className}>
			<body>
				<Providers>
					<main>{children}</main>
					<Toaster />
				</Providers>
			</body>
		</html>
	);
}
