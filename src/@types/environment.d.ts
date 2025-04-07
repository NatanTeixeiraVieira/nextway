import type { EnvVariables } from '@/types/env-variables.type';

// biome-ignore lint/complexity/noUselessEmptyExport: It's necessary to export the type for the global declaration
export {};

declare global {
	namespace NodeJS {
		interface ProcessEnv extends EnvVariables {}
	}
}
