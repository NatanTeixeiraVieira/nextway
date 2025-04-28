'use client';

import { CardPayment } from '@mercadopago/sdk-react';
import styles from './payment-form.module.css';

type PaymentFormProps = {
	tenantId: string;
};

export default function PaymentForm({ tenantId }: PaymentFormProps) {
	return (
		<div className={styles.paymentForm}>
			<CardPayment
				customization={{
					paymentMethods: { maxInstallments: 1, minInstallments: 1 },
					visual: {
						hideFormTitle: true,
						style: {
							customVariables: {
								baseColor: '#0ea5e9',
							},
						},
					},
				}}
				initialization={{ amount: 20 }}
				onSubmit={async (param) => {
					console.log(param);
				}}
			/>
		</div>
	);
}
