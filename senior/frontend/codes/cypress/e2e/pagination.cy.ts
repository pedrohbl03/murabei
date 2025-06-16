describe('Pagination handler without Filters', () => {
  beforeEach(() => {
    cy.visit(process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000/');
  });

  it('should navigate to the next page', () => {
    cy.get('[data-cy="next-page"]').click();
    cy.url().should('include', 'page=2');
  });
});

describe('Pagination handler with Filters', () => {
  beforeEach(() => {
    cy.visit(process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000/');
  });

  it('should navigate to the next page with filters applied', () => {
    cy.get('input[name="title"]').type('war');

    cy.wait(1000);

    cy.get('[data-cy="next-page"]').click();
    cy.url().should('include', 'page=2');

    cy.get('[data-cy="book-item"]').should('have.length.greaterThan', 0);
  });
});

describe('Pagination handler with Filters and Last Page', () => {
  beforeEach(() => {
    cy.visit(process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000/');
  });

  it('should navigate to the last page with filters applied', () => {
    cy.get('input[name="title"]').type('women');

    cy.wait(1000);

    cy.get('[data-cy="page-3"]').click();
    cy.url().should('include', 'page=3');

    cy.get('[data-cy="book-item"]').should('have.length.greaterThan', 0);
  });
});