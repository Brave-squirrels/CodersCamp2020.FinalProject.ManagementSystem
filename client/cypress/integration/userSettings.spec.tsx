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

Cypress.Commands.add(
  "changePassword",
  (oldPassword, newPasswordFirst, newPasswordSecond = newPasswordFirst) => {
    cy.get(
      ".userSettings_passwordContainer__263iE > :nth-child(1) > .input_inputContainer__3VTNa > .input_input__1qfDZ"
    )
      .clear()
      .type(oldPassword);
    cy.get(":nth-child(2) > .input_inputContainer__3VTNa > .input_input__1qfDZ")
      .clear()
      .type(newPasswordFirst);
    cy.get(
      ".userSettings_passwordContainer__263iE > :nth-child(3) > .input_inputContainer__3VTNa > .input_input__1qfDZ"
    )
      .clear()
      .type(newPasswordSecond);
  }
);

describe("test the user settings panel", () => {
  beforeEach(() => {
    // @ts-ignore
    cy.login();
    cy.viewport(1200, 850);
    cy.visit("/settings");
    cy.wait(500);
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
    // eslint-disable-next-line jest/valid-expect-in-promise
    cy.get(
      ".userSettings_name__iFYsG > .input_inputContainer__3VTNa > .input_input__1qfDZ"
    ).then((res: any) => {
      const prevName = res[0].value;
      // cancel change name
      cy.get(".userSettings_btnReset__hianq > .button_button__2FNsC").click();
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

  it("should check for changing the password", () => {
    const oldPassword = "12345678";
    const newPassword = "123456789";

    // check for invalid password
    // @ts-ignore
    cy.changePassword("11111111", newPassword);
    cy.get(
      ".userSettings_passwordContainer__263iE > .button_button__2FNsC"
    ).click();
    cy.contains(".errorHandler_errorContainer__sj49a", "Invalid password.");

    // check for invalid new password
    // @ts-ignore
    cy.changePassword(oldPassword, "11111111", "22222222");
    cy.get(
      ".userSettings_passwordContainer__263iE > .button_button__2FNsC"
    ).click();
    cy.contains(
      ".errorHandler_errorContainer__sj49a",
      "New password and confirm password must be the same."
    );

    // chagne password
    // @ts-ignore
    cy.changePassword(oldPassword, newPassword);
    cy.get(
      ".userSettings_passwordContainer__263iE > .button_button__2FNsC"
    ).click();
    cy.get(".userSettings_success__1Uzbp").should("exist");
    cy.get(".userSettings_modal__3md16 > div > .button_button__2FNsC").click();

    // restore to the previous password
    // @ts-ignore
    cy.changePassword(newPassword, oldPassword);
    cy.get(
      ".userSettings_passwordContainer__263iE > .button_button__2FNsC"
    ).click();
    cy.get(".modal_modalClose__lWcXi").click();
  });

  it("should display modal when click delete account", () => {
    cy.contains("p", "Delete account").click();
    cy.get(".userSettings_modal__3md16 > div > :nth-child(1)").click();
    cy.contains("p", "Delete account").click();
    cy.get(".modal_modalClose__lWcXi").click();
  });
});
