Feature: Choose Ingredients
  As a cook, I would like to know what ingredients are available on this website so I can cook food from them.

  Scenario: Show all Categories
      When  The website is visited
      Then  All Categories are displayed
       
  Scenario: Show all Ingredients of a Category
      Given The website was visited
       When I click on a Category Tile
       Then All Ingredients of this Category are displayed
