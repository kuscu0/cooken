Feature: Find Recipes
  As a cook, I would like to be able to search for ingredients on this website.

  Scenario: Find an Ingredient
      Given The website was visited
       When I click the Quick Search Bar
        And I enter a search term that is not empty
        And The term entered matches at least one Ingredient Name in the database table
       Then All Ingredients matching are displayed
       
  Scenario: Ingredient not found
      Given The website was visited
       When I click the Quick Search Bar
        And I enter a search term that is not empty
        And The term entered matches no Ingredient Name in the database table
       Then A Text "No Ingredients found" is displayed
