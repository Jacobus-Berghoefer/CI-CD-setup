describe('App Load Test', () => {
    it('should load the home page and display the start button', () => {
      cy.visit('/');
      cy.get('button').contains('Start Quiz').should('be.visible');
    });
  
    it('should start the quiz and display a question', () => {
      cy.visit('/');
      cy.get('button').contains('Start Quiz').click();
      cy.get('.card.p-4 h2').should('be.visible');
      cy.get('h2').should('not.be.empty');
    });
  });
  