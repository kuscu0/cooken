
describe("Main functionality tests", () => {
    before(() => {
        cy.clearLocalStorage();
        cy.visit("/login");
        cy.get("#registerEmail").type("cypressTestMain@test.com");
        cy.get("#registerPassword").type("superSafePasswordYEP");
        cy.get("form button").contains("Login").click();
        cy.location("pathname").should("eq", "/");
        cy.saveLocalStorage();
    })

    beforeEach(() => {
        cy.restoreLocalStorage();
    });

    afterEach(() => {
        cy.saveLocalStorage();
    });

    it("Manage Ingredients", () => {
        cy.visit("/manageIngredients");

        cy.get(`[data-category="Gewürze"]`).click();
        cy.get(".searchResults button[data-added=false]").contains(/^Zimt$/).first().as("zimtButton");
        cy.get("@zimtButton").should("not.be.visible");
        cy.get("@zimtButton").scrollIntoView();
        cy.get("@zimtButton").should("be.visible");
        cy.get("@zimtButton").click();
        cy.get("@zimtButton").invoke("attr", "data-added").should("eq", "true");
        cy.get("@zimtButton").click();
        cy.get("@zimtButton").invoke("attr", "data-added").should("eq", "false");

        cy.get(`[data-category="Gewürze"]`).click();
        cy.get(".search input[type=text]").type("zimt")
        cy.get(".searchResults button").should("include.text", "Zimt");
    });

    it("Search", () => {
        cy.visit("/recipeSearch");

        cy.get(`input[placeholder="Search..."]`).type("Kuchen");
        cy.get(".searchButton").click();
        cy.get(".results .recipeTile [title]", { timeout: 10000 }).should(titles => {
            assert(titles.length > 0)
            for (const title of titles)
                assert(/kuchen/i.test(title.innerText));
        })
    })
});