const OLDAL = 'https://nonamedod.github.io/fakestore/'
const VEGPONT = "https://fakestoreapi.com/products";

function betoltTermekek() {
  cy.intercept("GET", VEGPONT).as("getProducts");

  cy.visit(OLDAL);

  cy.get("#termekek").click();
}

describe("template spec", () => {

  it("passes", () => {

    cy.visit(OLDAL);

    cy.get("#termekek").click();

    cy.get("#termekek").should("be.visible");

  });

  describe("termékek lekérése végpontról", () => {

    it("megjeleníti a termékeket", () => {

      cy.intercept("GET", VEGPONT).as("getProducts");

      cy.visit(OLDAL);

      cy.get("#termekek").click();

      cy.wait("@getProducts");

      cy.get(".card")
        .should("have.length.greaterThan", 0);

    });

  });

  describe("hálózati válasz teszt", () => {

    beforeEach(() => {
      betoltTermekek();
    });

    it("hálozati válasz", () => {

      cy.wait("@getProducts")
        .its("response.statusCode")
        .should("eq", 200);

    });
  });
});