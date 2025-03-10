// TODO: Fix these server side tests

// describe('<ActivateAccountPage /> e2e tests', () => {
// 	beforeEach(() => {
// 		cy.visit('/activate-account/test_token');
// 		cy.intercept('http://localhost:3333/api/user/v1/check-email', {
// 			statusCode: 200,
// 			body: {
// 				id: 'e7db3727-3a84-42f2-99d7-8f8ada28eb15',
// 				email: 'test@email.com',
// 			},
// 		}).as('checkEmail');
// 	});

// 	it('should show loading when page load', () => {
// 		cy.get('[data-testid="activate-account-loading"]').should('have.length', 1);
// 	});

// 	it('should activate user account', () => {
// 		cy.wait('@checkEmail');

// 		cy.url().should('eq', `${Cypress.config().baseUrl}/`);
// 	});

// 	it('should handle account activation error', () => {
// 		cy.intercept('POST', 'http://localhost:3333/api/user/v1/check-email', {
// 			statusCode: 401,
// 			body: {
// 				statusCode: 401,
// 				error: 'Unauthorized',
// 				message: 'Invalid token',
// 			},
// 		}).as('checkEmail');

// 		cy.wait('@checkEmail');

// 		cy.get('[data-testid="invalid-token-content"]')
// 			.should('have.length', 1)
// 			.and('contain.text', 'O token informado não é válido.');
// 	});
// });
