Feature: Choose Ingredients
  As a cook, I would like to know what ingredients are available on this website so I can cook food from them.

  Scenario: Show all Categories
      Given The website was visited
      Then All Ingredients of this Category are displayed
       
  Scenario: Show all Ingredients of a Category
      Given The website was visited
       When I click on a Category Tile
       Then All Ingredients of this Category are displayed

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
