import type { Metadata } from 'next';
import './globals.css';

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
		<html lang="pt-BR">
			<body>{children}</body>
		</html>
	);
}
