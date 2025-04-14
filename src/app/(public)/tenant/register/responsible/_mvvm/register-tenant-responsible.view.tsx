import { Input, InputContainer } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import ActionButtons from '../../_components/action-buttons';
import type { useRegisterTenantResponsible } from './register-tenant-responsible.model';

type RegisterTenantResponsibleViewProps = ReturnType<
	typeof useRegisterTenantResponsible
>;

export default function RegisterTenantResponsibleView(
	props: RegisterTenantResponsibleViewProps,
) {
	const {
		errors,
		handleCpfChange,
		handleResponsiblePhoneNumberChange,
		handleSubmit,
		register,
	} = props;

	return (
		<form onSubmit={handleSubmit} className="space-y-4">
			<InputContainer>
				<Label htmlFor="name">Nome do responsável</Label>
				<Input
					id="name"
					type="text"
					placeholder="Exemplo: João da Silva"
					{...register('name')}
					helperText={errors.name?.message}
				/>
			</InputContainer>

			<InputContainer>
				<Label htmlFor="cpf">CPF do responsável</Label>
				<Input
					id="cpf"
					type="text"
					placeholder="Exemplo: 111.222.333-44"
					{...register('cpf', { onChange: handleCpfChange })}
					helperText={errors.cpf?.message}
				/>
			</InputContainer>

			<InputContainer>
				<Label htmlFor="responsiblePhoneNumber">Telefone do responsável</Label>
				<Input
					id="responsiblePhoneNumber"
					type="text"
					placeholder="Exemplo: +55 (00) 91111-2222"
					{...register('responsiblePhoneNumber', {
						onChange: handleResponsiblePhoneNumberChange,
					})}
					helperText={errors.responsiblePhoneNumber?.message}
				/>
			</InputContainer>

			<ActionButtons />
		</form>
	);
}
