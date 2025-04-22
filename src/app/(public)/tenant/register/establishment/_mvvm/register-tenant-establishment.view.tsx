'use client';

import { Input, InputContainer } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import ActionButtons from '../../_components/action-buttons';
import type { useRegisterTenantEstablishment } from './register-tenant-establishment.model';

type RegisterTenantEstablishmentViewProps = ReturnType<
	typeof useRegisterTenantEstablishment
>;

export default function RegisterTenantEstablishment(
	props: RegisterTenantEstablishmentViewProps,
) {
	const {
		errors,
		handleEstablishmentPhoneNumberChange,
		handleCnpjBlur,
		handleCnpjChange,
		handleSubmit,
		register,
	} = props;

	return (
		<form onSubmit={handleSubmit} className="space-y-4">
			<InputContainer>
				<Label htmlFor="cnpj">CNPJ</Label>
				<Input
					id="cnpj"
					type="text"
					placeholder="Exemplo: 11.222.333/0001-44"
					{...register('cnpj', {
						onChange: handleCnpjChange,
						onBlur: handleCnpjBlur,
					})}
					helperText={errors.cnpj?.message}
				/>
			</InputContainer>

			<InputContainer>
				<Label htmlFor="corporateReason">Rezão social</Label>
				<Input
					id="corporateReason"
					type="text"
					placeholder="Rezão social"
					{...register('corporateReason')}
					disabled
				/>
			</InputContainer>

			<InputContainer>
				<Label htmlFor="stablishmentName">Nome do estabelecimento</Label>
				<Input
					id="stablishmentName"
					type="text"
					placeholder="Exemplo: Pizzaria do João"
					{...register('establishmentName')}
					helperText={errors.establishmentName?.message}
				/>
			</InputContainer>

			<InputContainer>
				<Label htmlFor="stablishmentoPhoneNumber">
					Telefone ou celular do estabelecimento
				</Label>
				<Input
					id="stablishmentoPhoneNumber"
					type="text"
					placeholder="Exemplo: +55 (00) 91111-2222"
					{...register('establishmentPhoneNumber', {
						onChange: handleEstablishmentPhoneNumberChange,
					})}
					helperText={errors.establishmentPhoneNumber?.message}
				/>
			</InputContainer>

			<InputContainer>
				<Label htmlFor="slug">URL do estabelecimento</Label>
				<Input
					id="slug"
					type="text"
					placeholder="Exemplo: pizzaria-do-joao"
					{...register('slug')}
					helperText={errors.slug?.message}
				/>
			</InputContainer>
			<p className="text-xs !mt-1">
				Esse é o nome que aparecerá no endereço da págiana, como
				https://nextway.com.br/pizzaria-do-joao
			</p>

			<ActionButtons />
		</form>
	);
}
