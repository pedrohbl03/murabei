describe('Book Filter By Title', () => {
  beforeEach(() => {
    cy.visit(process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000/');
  });

  it('should filter books by title', () => {
    cy.get('input[name="title"]').type('The War Within');

    /* Await page reload after filter */
    cy.wait(1000);

    cy.get('[data-cy="book-item"').should('have.length.greaterThan', 0);
    cy.get('[data-cy="book-item"]').each(($el) => {
      cy.wrap($el).find('[data-cy="book-title"]').invoke('text').then((text) => {
        expect(text.toLowerCase()).to.include('the war within');
      });
    });
  });
});

describe('Book Filter By Author', () => {
  beforeEach(() => {
    cy.visit(process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000/');
  });

  it('should filter books by author', () => {
    cy.get('input[name="author"]').type('Various');

    /* Await page reload after filter */
    cy.wait(1000);

    cy.get('[data-cy="book-item"').should('have.length.greaterThan', 0);
    cy.get('[data-cy="book-item"]').each(($el) => {
      cy.wrap($el).find('[data-cy="book-author"]').invoke('text').then((text) => {
        expect(text.toLowerCase()).to.include('various');
      });
    });
  });
});

describe('Book Filter By Subject', () => {
  beforeEach(() => {
    cy.visit(process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000/');
  });

  it('should filter books by subject', () => {
    cy.get('input[name="subject"]').type('science');

    /* Await page reload after filter */
    cy.wait(1000);

    cy.get('[data-cy="book-item"').should('have.length.greaterThan', 0);
  });
});

describe('Book Filter By Parcial Title and Author', () => {
  beforeEach(() => {
    cy.visit(process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000/');
  });

  it('should filter books by title and author', () => {
    cy.get('input[name="title"]').type('War');
    cy.get('input[name="author"]').type('Antonio Carlos Filho');

    /* Await page reload after filter */
    cy.wait(1000);

    cy.get('[data-cy="book-item"').should('have.length.greaterThan', 0);
    cy.get('[data-cy="book-item"]').each(($el) => {
      cy.wrap($el).find('[data-cy="book-title"]').invoke('text').then((text) => {
        expect(text.toLowerCase()).to.include('The war within'.toLowerCase());
      });
      cy.wrap($el).find('[data-cy="book-author"]').invoke('text').then((text) => {
        expect(text.toLowerCase()).to.include('Antonio Carlos Filho'.toLowerCase());
      });
    });
  });
});

describe('Book Filter By Parcial Title and Subject', () => {
  beforeEach(() => {
    cy.visit(process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000/');
  });

  it('should filter books by title and subject', () => {
    cy.get('input[name="title"]').type('War');
    cy.get('input[name="subject"]').type('history');

    /* Await page reload after filter */
    cy.wait(1000);

    cy.get('[data-cy="book-item"').should('have.length.greaterThan', 0);
    cy.get('[data-cy="book-item"]').each(($el) => {
      cy.wrap($el).find('[data-cy="book-title"]').invoke('text').then((text) => {
        expect(text.toLowerCase()).to.include('The Vietnam Reader: The Definitive Collection of American Fiction and Nonfiction on the War'.toLowerCase());
      });
    });
  });
});



