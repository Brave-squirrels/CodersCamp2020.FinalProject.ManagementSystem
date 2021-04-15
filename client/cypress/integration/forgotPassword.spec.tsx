describe("Test createTeam", () => {
  beforeEach(() => {
    // @ts-ignore
    cy.viewport(1200, 850);
    cy.visit("/forgotpassword");
    cy.wait(500);
  });

  it("Should send reset password mail", () => {
    const mail = "tilabjeden@gazeta.pl";
    cy.get("[class*=input_inputContainer] input")
      .clear({ force: true })
      .type(mail);
    cy.get("[class*=formStructure_form] > button").click({ force: true });
  });
  it("Should return to main page onClick", () => {
    cy.get("[class*=forgotPassword_goBackBtn] > button").click();
    cy.location("pathname").should("eq", "/");
  });
});
