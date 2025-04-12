import type { CnpjService } from '@/types/cnpj-service.type';
import { api } from '@/utils/api';

type CnpjResponse = {
	abertura: string;
	situacao: string;
	tipo: string;
	nome: string;
	porte: string;
	natureza_juridica: string;
	atividade_principal: MainActivity[];
	atividades_secundarias: SecondaryActivity[];
	qsa: Qsa[];
	logradouro: string;
	numero: string;
	complemento: string;
	municipio: string;
	bairro: string;
	uf: string;
	cep: string;
	email: string;
	telefone: string;
	data_situacao: string;
	cnpj: string;
	ultima_atualizacao: string;
	status: string;
	fantasia: string;
	efr: string;
	motivo_situacao: string;
	situacao_especial: string;
	data_situacao_especial: string;
	capital_social: string;
	simples: Simple;
	simei: Simei;
	extra: Extra;
	billing: Billing;
};

type MainActivity = {
	code: string;
	text: string;
};

type SecondaryActivity = {
	code: string;
	text: string;
};

type Qsa = {
	nome: string;
	qual: string;
	nome_rep_legal?: string;
	qual_rep_legal?: string;
};

type Simple = {
	optante: boolean;
	data_opcao: string;
	data_exclusao: string;
	ultima_atualizacao: string;
};

type Simei = {
	optante: boolean;
	data_opcao: string;
	data_exclusao: string;
	ultima_atualizacao: string;
};

type Extra = Record<string, unknown>;

type Billing = {
	free: boolean;
	database: boolean;
};

export const cnpjService: CnpjService = {
	getInfosByCnpj: async (cnpj: string) => {
		const response = await api.get<CnpjResponse>(`/${cnpj}`, {
			disableRefresh: true,
			baseUrl: process.env.NEXT_PUBLIC_CNPJ_API_URL,
			credentials: 'omit',
		});

		// TODO Add the request in the backend
		return {
			data: response.data
				? {
						corporateReason: response.data?.nome,
					}
				: null,
			response: response.response,
		};
	},
};
