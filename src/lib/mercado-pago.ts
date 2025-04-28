import { initMercadoPago } from '@mercadopago/sdk-react';

export const initPaymentGateway = () => {
	initMercadoPago(process.env.NEXT_PUBLIC_PAYMENT_GATEWAY_PUBLIC_KEY);
};
