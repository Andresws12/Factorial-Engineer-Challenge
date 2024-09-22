import sectionHomePage from './utilities/home/home.selectors';

describe('01 Home View', () => {
  beforeEach(() => {
    cy.visit('/');
  });
  it('01 Check if is visible the content', () => {
    cy.get(sectionHomePage.sectionHomePage).should('be.visible');

    cy.get(sectionHomePage.sectionBike).should('be.visible');
    cy.get(sectionHomePage.sectionBikeTitle).should('be.visible');

    cy.get(sectionHomePage.homeParts).should('be.visible');
    cy.get(sectionHomePage.sectionParts).should('be.visible');
    cy.get(sectionHomePage.homePartsName).should('be.visible');
    cy.get(sectionHomePage.sectionPartsTitle).should('be.visible');

    cy.get(sectionHomePage.partsCharacteristic).should('be.visible');
    cy.get(sectionHomePage.partsCharacteristicOptionTitle).should('be.visible');
    cy.get(sectionHomePage.partsCharacteristicName).should('be.visible');
    cy.get(sectionHomePage.partsCharacteristicOption).should('be.visible');
    cy.get(sectionHomePage.homePartsName).should('be.visible');
  });

  it('02 Check add part', () => {
    cy.get(sectionHomePage.homePartsName).eq(0).click();
    cy.get(sectionHomePage.partsCharacteristicOptionTitle).eq(0).click();
    cy.get(sectionHomePage.partsCharacteristicOptionName).eq(0).click();

    cy.get(sectionHomePage.bikeSelectedParts).should('be.visible');
    cy.get(sectionHomePage.bikeSelectedPart).should('be.visible');
  });
});
