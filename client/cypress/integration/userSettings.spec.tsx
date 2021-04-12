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
      "[class*=passwordContainer]  > :nth-child(1) > [class*=input_inputContainer]  > [class*=input_input] "
    )
      .clear()
      .type(oldPassword);
    cy.get(
      ":nth-child(2) > [class*=input_inputContainer]  > [class*=input_input] "
    )
      .clear()
      .type(newPasswordFirst);
    cy.get(
      "[class*=passwordContainer]  > :nth-child(3) > [class*=input_inputContainer]  > [class*=input_input] "
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
    cy.contains("[class*=btnReset] > [class*=button]", "EDIT");
    cy.get("[class*=btnReset] > [class*=button]").click();
    cy.contains("[class*=btnShift] > [class*=button]", "SAVE");
    cy.get("[class*=btnShift] > [class*=button]").click();
  });

  it("should change user name", () => {
    // eslint-disable-next-line jest/valid-expect-in-promise
    cy.get(
      "[class*=name] > [class*=inputContainer] > [class*=input_input] "
    ).then((res: any) => {
      const prevName = res[0].value;
      // cancel change name
      cy.get("[class*=btnReset] > [class*=button]").click();
      cy.get(
        "[class*=name] > [class*=inputContainer] > [class*=input_input] "
      ).type("a");
      cy.get("[class*=svg]").click();
      cy.get("[class*=btnReset] > [class*=button]").click();
      cy.get(`[value="${prevName}"]`).should("exist");

      // change name
      cy.get(
        "[class*=name] > [class*=inputContainer] > [class*=input_input] "
      ).type("a");
      cy.get("[class*=btnShift] > [class*=button]").click();

      // verification of the change
      cy.get(`[value="${prevName}"]`).should("not.exist");

      // restore to the previous value
      cy.get("[class*=btnReset] > [class*=button]").click();
      cy.get(
        "[class*=name] > [class*=inputContainer] > [class*=input_input] "
      ).clear();
      cy.get(
        "[class*=name] > [class*=inputContainer] > [class*=input_input] "
      ).type(prevName);
      cy.get("[class*=btnShift] > [class*=button]").click();
    });
  });

  it("should check for changing the password", () => {
    const oldPassword = "12345678";
    const newPassword = "123456789";

    // check for invalid password
    // @ts-ignore
    cy.changePassword("11111111", newPassword);
    cy.get("[class*=passwordContainer] > [class*=button]").click();
    cy.contains("[class*=errorContainer] ", "Invalid password.");

    // check for invalid new password
    // @ts-ignore
    cy.changePassword(oldPassword, "11111111", "22222222");
    cy.get("[class*=passwordContainer] > [class*=button]").click();
    cy.contains(
      "[class*=errorContainer] ",
      "New password and confirm password must be the same."
    );

    // chagne password
    // @ts-ignore
    cy.changePassword(oldPassword, newPassword);
    cy.get("[class*=passwordContainer] > [class*=button]").click();
    cy.get("[class*=success] ").should("exist");
    cy.get("[class*=modal]  > div > [class*=button] ").click();

    // restore to the previous password
    // @ts-ignore
    cy.changePassword(newPassword, oldPassword);
    cy.get("[class*=passwordContainer] > [class*=button]").click();
    cy.get("[class*=modalClose] ").click();
  });

  it("should display modal when click delete account", () => {
    cy.contains("p", "Delete account").click();
    cy.get("[class*=userSettings_modal]  > div > :nth-child(1)").click();
    cy.contains("p", "Delete account").click();
    cy.get("[class*=modalClose] ").click();
  });
});
