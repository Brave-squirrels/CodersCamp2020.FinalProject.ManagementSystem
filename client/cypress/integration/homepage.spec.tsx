describe("renders the home page", () => {
  it("should renders correctly", () => {
    cy.visit("/");
    cy.get("#root").should("exist");
  });
});
