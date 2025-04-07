import { Button } from '@/components/ui/button';
import { Input, InputContainer } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import type { useRegisterTenantAddress } from './register-tenant-address.model';

type RegisterTenantAddressViewProps = ReturnType<
	typeof useRegisterTenantAddress
>;

export default function RegisterTenantAddressView(
	props: RegisterTenantAddressViewProps,
) {
	const {
		errors,
		handleSubmit,
		handleZipcodeBlur,
		handleZipcodeChange,
		register,
	} = props;

	return (
		<form onSubmit={handleSubmit} className="space-y-4">
			<InputContainer>
				<Label htmlFor="zipcode">CEP</Label>
				<Input
					id="zipcode"
					type="text"
					placeholder="Exemplo: 00000-000"
					{...register('zipcode', { onChange: handleZipcodeChange })}
					onBlur={handleZipcodeBlur}
					helperText={errors.zipcode?.message}
				/>
			</InputContainer>

			<div className="grid grid-cols-2 gap-4">
				<InputContainer>
					<Label htmlFor="state">Estado</Label>
					<Input
						id="state"
						type="text"
						placeholder="Estado"
						{...register('state')}
						disabled
					/>
				</InputContainer>

				<InputContainer>
					<Label htmlFor="city">Cidade</Label>
					<Input
						id="city"
						type="text"
						placeholder="Cidade"
						{...register('city')}
						disabled
					/>
				</InputContainer>
			</div>

			<InputContainer>
				<Label htmlFor="neighborhood">Bairro</Label>
				<Input
					id="neighborhood"
					type="text"
					placeholder="Exemplo: Copacabana"
					{...register('neighborhood')}
					helperText={errors.neighborhood?.message}
				/>
			</InputContainer>

			<InputContainer>
				<Label htmlFor="street">Rua</Label>
				<Input
					id="street"
					type="text"
					placeholder="Exemplo: Avenida Paulista"
					{...register('street')}
					helperText={errors.street?.message}
				/>
			</InputContainer>

			<InputContainer>
				<Label htmlFor="number">Número</Label>
				<Input
					id="number"
					type="text"
					placeholder="Exemplo: 123"
					{...register('number')}
					helperText={errors.number?.message}
				/>
			</InputContainer>

			<InputContainer>
				<Label htmlFor="complement">Complemento</Label>
				<Input
					id="complement"
					type="text"
					placeholder="Exemplo: Bloco B"
					{...register('complement')}
					helperText={errors.complement?.message}
				/>
			</InputContainer>

			<Button
				type="submit"
				className="w-full bg-gradient-to-r from-sky-500 to-sky-600 py-0"
				data-testid="register-submit-button"
			>
				Próximo
			</Button>
		</form>
	);
}
