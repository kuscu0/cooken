Feature: Comment on Recipe
  As a cook, I would like to add a comment (note) to a recipe.

  Scenario: Enter Comment mode
    When  The website is visited
    And I am logged in
    And I click on the 'My Profile' tab in the top bar
    And I have at least one Recipe saved to my profile
    And I click on a saved Recipe
    And I click the 'comment' button
    Then A text field is shown
       
  Scenario: Submit Comment
    Given A comment text field is displayed
    When I click into the text field
    And I enter a comment string that is not empty
    And I click the 'submit' button
    Then My comment is displayed on the page
    
