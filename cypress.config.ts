import { defineConfig } from 'cypress';

export default defineConfig({
	e2e: {
		specPattern: 'src/**/__tests__/e2e/*.e2e-spec.{ts,tsx}',
		baseUrl: 'http://localhost:3000',
		port: 8080,
		setupNodeEvents(on, config) {
			// implement node event listeners here
		},
	},
});
