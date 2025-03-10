describe('<ForgotPasswordPage /> e2e tests', () => {
	beforeEach(() => cy.visit('/forgot-password'));

	it('should show all error messages on form submission', () => {
		cy.get('[data-testid="forgot-password-submit-button"]').click();
		cy.get('[data-testid="helper-text"]').should('have.length', 1);
	});

	it('should show validation errors messages on form submission', () => {
		cy.get('[id="email"]').type('email@email.c');

		cy.get('[data-testid="forgot-password-submit-button"]').click();
		cy.get('[data-testid="helper-text"]').should('have.length', 1);
	});

	it('should show toast error when send email fail', () => {
		cy.once('uncaught:exception', () => false);
		cy.intercept(
			'POST',
			`${Cypress.env('API_BASE_URL')}/user/v1/recover-password/send-email`,
			{
				statusCode: 500,
				body: {
					statusCode: 500,
					error: 'Internal Server Error',
					message: 'An unexpected error ocurred',
				},
			},
		).as('sendEmail');

		cy.get('[id="email"]').type('email@email.com');

		cy.get('[data-testid="forgot-password-submit-button"]').click();

		cy.wait('@sendEmail');

		cy.get('.forgot-password-send-email-toast-error').should('have.length', 1);
	});

	it('should change send email', () => {
		cy.once('uncaught:exception', () => false);

		cy.intercept(
			'POST',
			`${Cypress.env('API_BASE_URL')}/user/v1/recover-password/send-email`,
			{
				body: {
					email: 'email@email.com',
				},
			},
		).as('sendEmail');

		cy.get('[id="email"]').type('email@email.com');

		cy.get('[data-testid="forgot-password-submit-button"]').click();

		cy.get('[data-testid="helper-text"]').should('have.length', 0);

		cy.wait('@sendEmail');

		cy.get('[data-testid="forgot-password-success-content"]').should(
			'have.length',
			1,
		);
	});
});
