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

describe("renders the home page", () => {
  beforeEach(() => {
    cy.login();
  });

  it("should renders correctly", () => {
    cy.visit("/");
  });
});
