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

describe("test the user settings panel", () => {
  beforeEach(() => {
    // @ts-ignore
    cy.login();
    cy.viewport(1200, 850);
    cy.visit("/settings");
  });

  it("should change button text after click", () => {
    cy.contains(
      ".userSettings_btnReset__hianq > .button_button__2FNsC",
      "EDIT"
    );
    cy.get(".userSettings_btnReset__hianq > .button_button__2FNsC").click();
    cy.contains(
      ".userSettings_btnShift__dkIzf > .button_button__2FNsC",
      "SAVE"
    );
    cy.get(".userSettings_btnShift__dkIzf > .button_button__2FNsC").click();
  });

  it("should change user name", () => {
    cy.get(".userSettings_btnReset__hianq > .button_button__2FNsC").click();

    // eslint-disable-next-line jest/valid-expect-in-promise
    cy.get(
      ".userSettings_name__iFYsG > .input_inputContainer__3VTNa > .input_input__1qfDZ"
    ).then((res: any) => {
      const prevName = res[0].value;

      // cancel change name
      cy.get(
        ".userSettings_name__iFYsG > .input_inputContainer__3VTNa > .input_input__1qfDZ"
      ).type("a");
      cy.get(".svg-inline--fa").click();
      cy.get(".userSettings_btnReset__hianq > .button_button__2FNsC").click();
      cy.get(`[value="${prevName}"]`).should("exist");

      // change name
      cy.get(
        ".userSettings_name__iFYsG > .input_inputContainer__3VTNa > .input_input__1qfDZ"
      ).type("a");
      cy.get(".userSettings_btnShift__dkIzf > .button_button__2FNsC").click();

      // verification of the change
      cy.get(`[value="${prevName}"]`).should("not.exist");

      // restore to the previous value
      cy.get(".userSettings_btnReset__hianq > .button_button__2FNsC").click();
      cy.get(
        ".userSettings_name__iFYsG > .input_inputContainer__3VTNa > .input_input__1qfDZ"
      ).clear();
      cy.get(
        ".userSettings_name__iFYsG > .input_inputContainer__3VTNa > .input_input__1qfDZ"
      ).type(prevName);
      cy.get(".userSettings_btnShift__dkIzf > .button_button__2FNsC").click();
    });
  });
});
