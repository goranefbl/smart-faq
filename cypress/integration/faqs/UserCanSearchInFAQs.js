// @noflow
/* global cy */

describe('User can search in FAQs', () => {
  beforeEach(() => {
    cy.loadStaticFAQ();
  });

  it(`The user can write and see a list of FAQ's and reset the input with cross button.`, () => {
    const wordToSearch = 'flight';
    cy.get('[data-cy=input-staticFAQ]').as('input-staticFAQ');

    cy
      .get('@input-staticFAQ')
      .type(wordToSearch)
      .should('have.value', wordToSearch);

    cy
      .get('[data-cy=scrollable-box]')
      .find('a')
      .should('exist');

    cy
      .get('[data-cy=faq-article-link]')
      .find('h1')
      .contains('How to adjust your flight (date, destination, etc)');

    cy.get('[data-cy=btn-reset-input]').click();
    cy.get('@input-staticFAQ').should('have.value', '');
  });
});
