/// <reference types="cypress" />
// @ts-check

Cypress.Commands.add("login", () => {
  cy.request({
    method: "POST",
    url: "http://localhost:5000/login",
    body: {
      email: "olo.a@wp.pl",
      password: "12345678",
    },
  }).then((res) => {
    localStorage.setItem("token", res.body.token);
    localStorage.setItem("id", res.body.id);
  });
});

describe("test project notes", () => {
  beforeEach(() => {
    // @ts-ignore
    cy.login();
    cy.viewport(1200, 850);
    cy.visit(
      "/teams/605fa5ce35561f136c8986ba/projects/60603ec1a390ae38a854559f/notes"
    );
    cy.wait(500);
    cy.get("[class*=addNew_iconWrapper]", { timeout: 2000 }).click();
  });
  it("should display modal", () => {
    cy.contains("span", "Create Note");
    cy.get("[class*=modal_modalClose]", { timeout: 2000 }).click();
  });

  it("Should create new note", () => {
    const title = "Test Title";
    const content = "Test Content";
    cy.get("[class*=input_inputContainer] input")
      .clear({ force: true })
      .type(title);
    cy.get("[class*=input_inputContainer] textarea").clear().type(content);
    cy.get("[class*=formStructure_form] > button").click({ force: true });
  });
  it("Should delete note", () => {
    cy.get("[class*=modal_modalClose]").click();
    cy.get(
      ":nth-child(1) > [class*=notes_buttonsWrapper] > .fa-trash > path"
    ).click();
  });
});
