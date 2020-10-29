Feature: Find Recipes
  As a cook I would like to see available recipes based on my selection of ingredients.

  Scenario: Find a Recipe
    Given At least one Ingredient has been added to the Inventory
    When I click the Recipe Search Bar
    And I enter a search term that is not empty
    And The term entered matches at least one Recipe Name in the database recipes table
    And The Recipe Names matched include the must use Ingredients (selected by User)
    And The Recipe Names matched only use Ingredients from the User's Inventory
    Then All cookable recipes are displayed
       
  Scenario: Recipe Name not found
    Given At least one Ingredient has been added to the Inventory
    When I click the Recipe Search Bar
    And I enter a search term that is not empty
    But The term entered matches no Recipe Name in the database recipes table
    Then A Text "No Recipes found" is displayed
    
  Scenario: No cookable Recipe found
    Given At least one Ingredient has been added to the Inventory
    When I click the Recipe Search Bar
    And I enter a search term that is not empty
    But The Recipe Names matched don't include the must use Ingredients (selected by User)
    Then A Text "No cookable Recipes found" is displayed
    
  Scenario: Missing Ingredients
    Given At least one Ingredient has been added to the Inventory
    When I click the Recipe Search Bar
    And I enter a search term that is not empty
    But The Recipe Names matched use at least one Ingredient that's not in the User's Inventory
    Then A Text "No cookable Recipes found" is displayed
