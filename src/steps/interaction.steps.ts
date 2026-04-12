import { When } from "@badeball/cypress-cucumber-preprocessor";

// ---------------------------------------------------------------------------
// Mouse Clicks
// Usage: When the user clicks the button "Sign in"
// ---------------------------------------------------------------------------

When("the user clicks the {word} {string}", (role: string, name: string) => {
  cy.findByRole(role, { name }).click();
});

// ---------------------------------------------------------------------------
// Text input
// Usage: When the user types "test@example.com" in to the textbox "Email"
//        When the user clears the textbox "Email"
// ---------------------------------------------------------------------------

When(
  "the user types {string} in to the {word} {string}",
  (value: string, role: string, name: string) => {
    cy.findByRole(role, { name }).clear().type(value);
  },
);

When("the user clears the {word} {string}", (role: string, name: string) => {
  cy.findByRole(role, { name }).clear();
});

// ---------------------------------------------------------------------------
// Select / checkbox
// Usage: When the user selects "Option A" from the "Sort by" combobox
//        When the user checks the "Remember me" checkbox
//        When the user unchecks the "Remember me" checkbox
// ---------------------------------------------------------------------------

When(
  "the user selects {string} from the {string} combobox",
  (option: string, name: string) => {
    cy.findByRole("combobox", { name }).select(option);
  },
);

When("the user checks the {string} checkbox", (name: string) => {
  cy.findByRole("checkbox", { name }).check();
});

When("the user unchecks the {string} checkbox", (name: string) => {
  cy.findByRole("checkbox", { name }).uncheck();
});

// ---------------------------------------------------------------------------
// Keyboard
// Usage: When the user presses "{enter}"
// ---------------------------------------------------------------------------

When("the user presses {string}", (keys: string) => {
  cy.get("body").type(keys);
});

// ---------------------------------------------------------------------------
// File upload
// Usage: When the user uploads "fixtures/avatar.png" to the file input
// ---------------------------------------------------------------------------

When("the user uploads {string} to the file input", (path: string) => {
  cy.get("input[type=file]").selectFile(path, { force: true });
});

// ---------------------------------------------------------------------------
// Scroll
// Usage: When the user scrolls the button "Load more" into view
// ---------------------------------------------------------------------------

When(
  "the user scrolls the {word} {string} into view",
  (role: string, name: string) => {
    cy.findByRole(role, { name }).scrollIntoView();
  },
);

// ---------------------------------------------------------------------------
// Blur / dismiss
// Usage: When the user clicks outside
// ---------------------------------------------------------------------------

When("the user clicks outside", () => {
  cy.get("body").click(0, 0);
});

// ---------------------------------------------------------------------------
// Network wait (flow control, not assertion)
// Usage: When the user waits for the "createUser" request
// ---------------------------------------------------------------------------

When("the user waits for the {string} request", (alias: string) => {
  cy.wait(`@${alias}`);
});
