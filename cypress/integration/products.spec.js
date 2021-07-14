describe("Products test", () => {
  it("products can be viewed", () => {
    cy.visit("/");
    cy.get("a[href='/product/1']");
  });

  it("manufacturers can be viewed", () => {
    cy.visit("/manufacturers");
    cy.get("a[href='/manufacturer/2']");
  });

  it("a manufacturer's products are displayed", () => {
    cy.visit("/manufacturer/2");
    cy.get("a[href='/product/12']");
  });

  it("the image is shown in the product details", () => {
    cy.visit("/product/1");
    cy.get("img[title='Nikon D780']");
  });

  it("search results are displayed", () => {
    cy.visit("/");
    cy.get("input[name='searchInput']").type("ikon");
    cy.get("a[href='/search/ikon']").click();
    cy.get("a[href='/product/1']");
  });
});
