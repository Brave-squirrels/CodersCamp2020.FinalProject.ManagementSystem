describe("Test createTeam", () => {
  beforeEach(() => {
    // @ts-ignore
    cy.viewport(1200, 850);
    cy.visit("/");
    cy.wait(500);
  });

  it("Should throw error - user already exist", () => {
    const mail = "olo.a@wp.pl";
    const name = "testName";
    const password = "password";
    const confirmPassword = "password";
    cy.get(
      "[class*=landingNotLogged_panelLeft] > [class*=landingNotLogged_content] > [class*=button_button]"
    ).click();
    cy.get(
      "[class*=landingNotLogged_signUpForm] > [class*=formStructure_form] > :nth-child(2) > [class*=input_input]"
    )
      .clear()
      .type(name);
    cy.get(
      "[class*=landingNotLogged_signUpForm] > [class*=formStructure_form] > :nth-child(3) > [class*=input_input]"
    )
      .clear()
      .type(mail);
    cy.get(
      "[class*=landingNotLogged_signUpForm] > [class*=formStructure_form] > :nth-child(4) > [class*=input_input]"
    )
      .clear()
      .type(password);
    cy.get(
      "[class*=landingNotLogged_signUpForm] > [class*=formStructure_form] > :nth-child(5) > [class*=input_input]"
    )
      .clear()
      .type(confirmPassword);
    cy.get(
      "[class*=landingNotLogged_signUpForm] > [class*=formStructure_form] > [class*=button_button]"
    ).click();
    cy.get("[class*=errorHandler_errorContainer]").contains(
      "User already registered."
    );
  });
  it("Should create new user", () => {
    const mail = `${Math.floor(Math.random() * (100 - 1)) + 1}}@wp.pl`;
    const name = "testName";
    const password = "password";
    const confirmPassword = "password";
    cy.get(
      "[class*=landingNotLogged_panelLeft] > [class*=landingNotLogged_content] > [class*=button_button]"
    ).click();
    cy.get(
      "[class*=landingNotLogged_signUpForm] > [class*=formStructure_form] > :nth-child(2) > [class*=input_input]"
    )
      .clear()
      .type(name);
    cy.get(
      "[class*=landingNotLogged_signUpForm] > [class*=formStructure_form] > :nth-child(3) > [class*=input_input]"
    )
      .clear()
      .type(mail);
    cy.get(
      "[class*=landingNotLogged_signUpForm] > [class*=formStructure_form] > :nth-child(4) > [class*=input_input]"
    )
      .clear()
      .type(password);
    cy.get(
      "[class*=landingNotLogged_signUpForm] > [class*=formStructure_form] > :nth-child(5) > [class*=input_input]"
    )
      .clear()
      .type(confirmPassword);
    cy.get(
      "[class*=landingNotLogged_signUpForm] > [class*=formStructure_form] > [class*=button_button]"
    ).click();
    /* cy.get("[class*=errorHandler_errorContainer]").contains(
      "User already registered."
    ); */
    cy.get("[class*=notification_subContainer]").should("exist");
  });
});
