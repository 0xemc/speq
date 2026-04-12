import { Then } from "@badeball/cypress-cucumber-preprocessor";

// ---------------------------------------------------------------------------
// Role-based assertions (interactive elements)
// Usage: Then the button "Sign in" should be visible
//        Then the textbox "Email" should have value "test@example.com"
// ---------------------------------------------------------------------------

Then(
  "the {word} {string} should {assertion}",
  (role: string, name: string, assertion: string) => {
    cy.findByRole(role, { name }).should(assertion);
  }
);

Then(
  "the {word} {string} should {assertion} {string}",
  (role: string, name: string, assertion: string, value: string) => {
    cy.findByRole(role, { name }).should(assertion, value);
  }
);

// ---------------------------------------------------------------------------
// TestId-based assertions (non-interactive containers)
// Usage: Then the element "user-card" should be visible
//        Then the element "error-banner" should contain "Invalid password"
// ---------------------------------------------------------------------------

Then(
  "the element {string} should {assertion}",
  (testId: string, assertion: string) => {
    cy.findByTestId(testId).should(assertion);
  }
);

Then(
  "the element {string} should {assertion} {string}",
  (testId: string, assertion: string, value: string) => {
    cy.findByTestId(testId).should(assertion, value);
  }
);

// ---------------------------------------------------------------------------
// Count assertion
// Usage: Then there are 3 "product-card" elements
// ---------------------------------------------------------------------------

Then(
  "there are {int} {string} elements",
  (count: number, testId: string) => {
    cy.findAllByTestId(testId).should("have.length", count);
  }
);

// ---------------------------------------------------------------------------
// Route assertions
// Usage: Then the current route is "/dashboard"
//        Then the current route matches "/projects/\w+-\d+"
//        Then the user is redirected to "/login"
// ---------------------------------------------------------------------------

Then("the current route is {string}", (route: string) => {
  cy.location("pathname").should("equal", route);
});

Then("the current route matches {string}", (pattern: string) => {
  cy.location("pathname").should("match", new RegExp(pattern));
});

Then("the user is redirected to {string}", (url: string) => {
  cy.location("href").should("include", url);
});

// ---------------------------------------------------------------------------
// Side-effect assertions
// Usage: Then a file named "export.csv" was downloaded
//        Then the "getUser" request was sent
// ---------------------------------------------------------------------------

Then("a file named {string} was downloaded", (name: string) => {
  cy.readFile(`${Cypress.config("downloadsFolder")}/${name}`).should("exist");
});

Then("the {string} request was sent", (alias: string) => {
  cy.wait(`@${alias}`);
});
