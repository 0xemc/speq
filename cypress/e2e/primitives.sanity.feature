Feature: Primitive sanity checks

  # Verifies that the {assertion} parameter type correctly transforms
  # space-separated phrases to Chai dot notation at runtime.

  Scenario: Single-word assertion
    Given the "/sandbox" route is loaded
    Then the button "Submit" should exist

  Scenario: Two-word assertion — be visible
    Given the "/sandbox" route is loaded
    Then the button "Submit" should be visible

  Scenario: Two-word assertion — not exist
    Given the "/sandbox" route is loaded
    Then the button "Ghost" should not exist

  Scenario: Three-word assertion — not be visible
    Given the "/sandbox" route is loaded
    Then the button "Hidden" should not be visible

  Scenario: Assertion with value — have value
    Given the "/sandbox" route is loaded
    Then the textbox "Email" should have value "prefilled@example.com"

  Scenario: Assertion with value — contain
    Given the "/sandbox" route is loaded
    Then the element "welcome-message" should contain "Welcome"

  Scenario: Assertion with value — have class
    Given the "/sandbox" route is loaded
    Then the button "Active" should have class "active"

  Scenario: Count assertion
    Given the "/sandbox" route is loaded
    Then there are 3 "product-card" elements

  Scenario: Route assertion
    Given the "/dashboard" route is loaded
    Then the current route is "/dashboard"

  Scenario: Route regex assertion
    Given the "/projects/abc-123" route is loaded
    Then the current route matches "/projects/\w+-\d+"
