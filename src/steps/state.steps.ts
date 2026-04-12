import { Given } from "@badeball/cypress-cucumber-preprocessor";

/**
 * State primitives — STUBS
 *
 * These steps have no implementation. They define the interface.
 * Replace the thrown errors with your stack-specific implementation.
 *
 * Examples of what implementations might do:
 *   - Call a seeding API endpoint
 *   - Run a cy.task() that hits the database directly
 *   - Set auth cookies via cy.task('loginUser', ...)
 */

Given(
  "a user exists with email {string} and password {string}",
  (_email: string, _password: string) => {
    throw new Error(
      'Stub: "a user exists with email/password" — implement in state.steps.ts'
    );
  }
);

Given("no user exists with email {string}", (_email: string) => {
  throw new Error(
    'Stub: "no user exists with email" — implement in state.steps.ts'
  );
});

Given("the user is authenticated as {string}", (_email: string) => {
  throw new Error(
    'Stub: "the user is authenticated as" — implement in state.steps.ts'
  );
});

Given("the fixture {string} is loaded", (_name: string) => {
  throw new Error(
    'Stub: "the fixture X is loaded" — implement in state.steps.ts'
  );
});
