describe("renders the home page", () => {
  it("should renders correctly", () => {
    cy.visit("/");
    cy.get(".formTitle_formTitle__tdCbP").should("exist");
  });

  it("should allows the date picker to be used", () => {
    cy.visit("/");
    cy.get(`.landingNotLogged_signInForm__1vAZ2 [type="email"]`).click();
    cy.get(`.landingNotLogged_signInForm__1vAZ2 [type="email"]`).type(
      "olo.a@wp.pl"
    );
    cy.get(`.landingNotLogged_signInForm__1vAZ2 [type="password"]`).type(
      "12345678"
    );
    cy.get(
      ".landingNotLogged_signInForm__1vAZ2 > .formStructure_form__9od9W > .button_button__2FNsC"
    ).click();
  });
});
