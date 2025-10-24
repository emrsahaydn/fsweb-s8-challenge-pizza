describe("Teknolojik Yemekler - Sipariş Formu", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/order");
  });

  it("İsim inputuna yazılabiliyor", () => {
    cy.get("[data-cy=name]").type("Emir Şahin");
    cy.get("[data-cy=name]").should("have.value", "Emir Şahin");
  });

  it("En az 4 malzeme seçilebiliyor", () => {
    cy.get("[data-cy=topping-Pepperoni] input").check({ force: true });
    cy.get("[data-cy=topping-Mısır] input").check({ force: true });
    cy.get("[data-cy=topping-Sosis] input").check({ force: true });
    cy.get("[data-cy=topping-Biber] input").check({ force: true });
    cy.get("[data-cy=toppings] input:checked").should("have.length", 4);
  });

  it("Form başarıyla gönderilebiliyor", () => {
    cy.get("[data-cy=name]").type("Emir Test");
    cy.get("[data-cy=size-M] input").check({ force: true });
    cy.get("[data-cy=dough]").select("Orta");
    cy.get("[data-cy=topping-Pepperoni] input").check({ force: true });
    cy.get("[data-cy=topping-Mısır] input").check({ force: true });
    cy.get("[data-cy=topping-Sosis] input").check({ force: true });
    cy.get("[data-cy=topping-Biber] input").check({ force: true });
    cy.get("[data-cy=notes]").type("Bol malzeme lütfen!");
    cy.get("[data-cy=submit]").click();
    cy.url().should("include", "/success");
  });
});
