import { Given } from "@badeball/cypress-cucumber-preprocessor";

// ---------------------------------------------------------------------------
// Navigation
// Usage: Given the "/login" route is loaded
// ---------------------------------------------------------------------------

Given("the {string} route is loaded", (url: string) => {
  cy.visit(url);
});

// ---------------------------------------------------------------------------
// Network interception
// Usage: Given a "POST" request to "/api/users" is aliased as "createUser"
//        Then the "createUser" request was sent        (in assertion.steps.ts)
// ---------------------------------------------------------------------------

Given(
  "a {string} request to {string} is aliased as {string}",
  (method: string, url: string, alias: string) => {
    cy.intercept({ method, url }).as(alias);
  }
);

// ---------------------------------------------------------------------------
// Time
// Usage: Given the date is "2024-01-15"
// ---------------------------------------------------------------------------

Given("the date is {string}", (date: string) => {
  cy.clock(new Date(date));
});
