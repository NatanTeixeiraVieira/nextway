// TODO: Fix these server page tests

// describe('<RecoverPasswordPage /> e2e tests', () => {
// 	beforeEach(() => {
// 		cy.once('uncaught:exception', () => false);
// 		cy.intercept(
// 			'POST',
// 			`${Cypress.env('API_BASE_URL')}/user/v1/recover-password/verify-token`,
// 			{
// 				statusCode: 200,
// 				body: {
// 					isValid: true,
// 				},
// 			},
// 		).as('verifyToken');
// 		cy.visit('/recover-password/test_token');
// 	});

// 	it('should show validation errors on form submission', () => {
// 		cy.get('[data-testid="recover-password-submit-button"]').click();
// 		cy.get('[data-testid="helper-text"]').should('have.length', 2);
// 	});

// 	it('should show validation errors for invalid inputs', () => {
// 		cy.get('[id="password"]').type('short');
// 		cy.get('[id="confirmPassword"]').type('different');

// 		cy.get('[data-testid="recover-password-submit-button"]').click();

// 		cy.get('[data-testid="helper-text"]').should('have.length', 2);
// 	});

// 	it('should show toast error when change password fails', () => {
// 		cy.once('uncaught:exception', () => false);
// 		cy.intercept(
// 			'POST',
// 			`${Cypress.env('API_BASE_URL')}/user/v1/recover-password/change-password`,
// 			{
// 				statusCode: 400,
// 				body: {
// 					statusCode: 400,
// 					error: 'Bad Request',
// 					message: 'Invalid token or password',
// 				},
// 			},
// 		).as('changePassword');

// 		cy.get('[id="password"]').type('new_password');
// 		cy.get('[id="confirmPassword"]').type('new_password');

// 		cy.get('[data-testid="recover-password-submit-button"]').click();

// 		cy.wait('@changePassword');

// 		cy.get('.recover-password-change-password-toast-error').should(
// 			'have.length',
// 			1,
// 		);
// 	});

// 	it('should change password successfully', () => {
// 		cy.intercept(
// 			'POST',
// 			`${Cypress.env('API_BASE_URL')}/user/v1/recover-password/change-password`,
// 			{
// 				body: {
// 					success: true,
// 				},
// 			},
// 		).as('changePassword');

// 		cy.get('[id="password"]').type('new_password');
// 		cy.get('[id="confirmPassword"]').type('new_password');

// 		cy.get('[data-testid="recover-password-submit-button"]').click();

// 		cy.wait('@changePassword');

// 		// Verify that the user is redirected to the auth page
// 		cy.url().should('eq', `${Cypress.config().baseUrl}/auth`);
// 	});
// });
