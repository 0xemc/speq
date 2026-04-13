import { defineParameterType } from "@badeball/cypress-cucumber-preprocessor";

/**
 * Matches space-separated Chai assertion phrases and converts to dot notation.
 *
 * "be visible"     → "be.visible"
 * "not exist"      → "not.exist"
 * "have value"     → "have.value"
 * "not be disabled" → "not.be.disabled"
 *
 * Cypress validates the assertion at runtime — no whitelist needed.
 */
defineParameterType({
  name: "assertion",
  regexp: /[a-z]+(?:\s+[a-z]+)*/,
  transformer: (s: string) => s.replace(/ /g, "."),
});
