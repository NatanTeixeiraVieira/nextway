import { defineConfig } from 'cypress';

export default defineConfig({
	e2e: {
		specPattern: 'src/**/__tests__/e2e/*.e2e-spec.{ts,tsx}',
		baseUrl: 'http://localhost:3000',
		port: 8080,
		env: {
			API_BASE_URL: 'http://localhost:3333/api',
		},
		setupNodeEvents(on, config) {
			// implement node event listeners here
		},
	},
});
