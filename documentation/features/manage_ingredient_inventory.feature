Feature: Find Ingredients
  As a cook, I would like to add or remove ingredients from my inventory.

  Scenario: Add Ingredient
    When  The website is visited
    And  All Categories are displayed
    And I click a category tile
    And All Ingredients of this category are shown
    And I click the '+' button next to an Ingredient name
    Then An Ingredient is added to my inventory
       
  Scenario: Remove Ingredient
    When  The website is visited
    And  All Categories are displayed
    And I click a category tile
    And All Ingredients of this category are shown
    And I click the '-' button next to an Ingredient name
    Then The Ingredient is removed from my inventory
       
