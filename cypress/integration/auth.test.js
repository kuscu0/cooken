

describe("Authentication", () => {
    describe("Register", () => {
        it("Register, Login and Delete accout", () => {
            cy.visit("/");

            // register
            cy.get("button").contains("Register").click();
            cy.location("pathname").should("eq", "/register");
            cy.get("#registerUsername").type("cypressTest");
            cy.get("#registerEmail").type("cypressTest@test.com");
            cy.get("#registerPassword").type("superSafePasswordYEP");
            cy.get("form button").contains("Register").click();

            cy.location("pathname").should("eq", "/login");

            // confirm it's working by logging in
            cy.get("#registerEmail").type("cypressTest@test.com");
            cy.get("#registerPassword").type("superSafePasswordYEP");
            cy.get("form button").contains("Login").click();
            cy.location("pathname").should("eq", "/");

            cy.request({
                method: "DELETE",
                url: "http://localhost:3000/auth",
                body: { email: "cypressTest@test.com" }
            });
        });
    });
});