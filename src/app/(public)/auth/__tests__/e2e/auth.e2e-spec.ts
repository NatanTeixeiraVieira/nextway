describe('<AuthPage /> e2e tests', () => {
	beforeEach(() => cy.visit('/auth'));

	describe('Register', () => {
		beforeEach(() => {
			cy.get('button[data-testid="register"]').click();
		});

		it('should show all error messages on form submission', () => {
			cy.get('[data-testid="register-submit-button"]').click();
			cy.get('[data-testid="helper-text"]').should('have.length', 4);
		});

		it('should show validation errors messages on form submission', () => {
			cy.get('[id="name"]').type('te');
			cy.get('[id="email"]').type('email@email.c');
			cy.get('[id="password"]').type('1234567');
			cy.get('[id="confirmPassword"]').type('12345678');

			cy.get('[data-testid="register-submit-button"]').click();

			cy.get('[data-testid="helper-text"]').should('have.length', 4);
		});

		it('should show toast error when register fail', () => {
			cy.once('uncaught:exception', () => false);
			cy.intercept('http://localhost:3333/api/user/v1/register', {
				statusCode: 400,
				body: {
					statusCode: 400,
					error: 'Bad Request',
					message: 'Registration failed',
				},
			}).as('register');

			cy.get('[id="name"]').type('tes');
			cy.get('[id="email"]').type('email@email.com');
			cy.get('[id="password"]').type('12345678');
			cy.get('[id="confirmPassword"]').type('12345678');

			cy.get('[data-testid="register-submit-button"]').click();

			cy.wait('@register');

			cy.get('.register-send-email-toast-error').should('have.length', 1);
		});

		it('should register user', () => {
			cy.intercept('http://localhost:3333/api/user/v1/register', {
				body: { id: '4b5ccb25-ad6d-46b7-a37a-e635c4f37252' },
			}).as('register');

			cy.get('[id="name"]').type('tes');
			cy.get('[id="email"]').type('email@email.com');
			cy.get('[id="password"]').type('12345678');
			cy.get('[id="confirmPassword"]').type('12345678');

			cy.get('[data-testid="register-submit-button"]').click();

			cy.wait('@register');

			cy.get('[data-testid="helper-text"]').should('have.length', 0);
			cy.get('.register-send-email-toast').should('have.length', 1);
		});
	});

	describe('Login', () => {
		it('should show all error messages on form submission', () => {
			cy.get('[data-testid="login-submit-button"]').click();
			cy.get('[data-testid="helper-text"]').should('have.length', 2);
		});

		it('should show validation errors messages on form submission', () => {
			cy.get('[id="email"]').type('email@email.c');
			cy.get('[id="password"]').type('1234567');

			cy.get('[data-testid="login-submit-button"]').click();

			cy.get('[data-testid="helper-text"]').should('have.length', 2);
		});

		it('should show toast error when login fail', () => {
			cy.once('uncaught:exception', () => false);
			cy.intercept('http://localhost:3333/api/user/v1/login', {
				statusCode: 400,
				body: {
					statusCode: 400,
					error: 'Bad Request',
					message: 'Registration failed',
				},
			}).as('login');

			cy.get('[id="email"]').type('email@email.com');
			cy.get('[id="password"]').type('12345678');

			cy.get('[data-testid="login-submit-button"]').click();

			cy.wait('@login');

			cy.get('.login-send-email-toast-error').should('have.length', 1);
		});

		it('should login user', () => {
			cy.intercept('http://localhost:3333/api/user/v1/login', {
				body: {
					id: '4b5ccb25-ad6d-46b7-a37a-e635c4f37252',
					email: 'email@email.com',
				},
			}).as('login');

			cy.get('[id="email"]').type('email@email.com');
			cy.get('[id="password"]').type('12345678');

			cy.get('[data-testid="login-submit-button"]').click();

			cy.get('[data-testid="helper-text"]').should('have.length', 0);
			cy.wait('@login');
			cy.url().should('eq', `${Cypress.config().baseUrl}/`);
		});
	});
});
