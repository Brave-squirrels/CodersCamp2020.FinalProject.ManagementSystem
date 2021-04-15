/// <reference types="cypress" />
// @ts-check

Cypress.Commands.add("login", () => {
  cy.request({
    method: "POST",
    url: "http://localhost:5000/login",
    body: {
      email: "tilabjeden@gazeta.pl",
      password: "password",
    },
  }).then((res) => {
    localStorage.setItem("token", res.body.token);
    localStorage.setItem("id", res.body.id);
  });
});

describe("Test createTeam", () => {
  beforeEach(() => {
    // @ts-ignore
    cy.login();
    cy.viewport(1200, 850);
    cy.visit("/");
    cy.wait(500);
  });
  it("Display modal", () => {
    cy.get("[class*=addNew_iconWrapper]", { timeout: 2000 }).click();
  });

  it("Should create new team", () => {
    const name = `${Math.floor(Math.random() * (100 - 1)) + 1}Test Name`;
    const description = "Test Description";
    cy.get("[class*=addNew_iconWrapper]", { timeout: 2000 }).click();
    cy.get("[class*=input_inputContainer] input")
      .clear({ force: true })
      .type(name);
    cy.get("[class*=input_inputContainer] textarea").clear().type(description);
    cy.get("[class*=formStructure_form] > button").click({ force: true });
  });
});
