Feature: Find Ingredients
  As a cook, I would like to save recipes I cook frequently and unsave recipes I don't like anymore.

  Scenario: Show saved Recipes
    When The website is visited
    And I am logged in
    And The 'My Profile' button on the navigation bar is clicked
    Then All saved recipes are displayed
       
  Scenario: Save Recipes
    Given The website was visited
    And I click the 'Search' button on the navigation bar
    And I find a recipe
    And I click a recipe tile
    And The recipe page is displayed
    And I click the 'save' button
    Then The displayed recipe is saved to my profile
       
  Scenario: Unsave Recipe
    Given The website was visited
    And The 'My Profile' button on the navigation bar is clicked
    And At least one recipe is saved to my profile
    And I click a recipe tile on my profile
    And The recipe page is displayed
    And I click the 'unsave' button
    Then The displayed recipe is unsaved from my profile
