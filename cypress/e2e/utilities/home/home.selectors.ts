import { cySelector } from '../utils';

const HOME_BIKE = 'home-bike';
const HOME_PARTS = 'home-parts';

const HOME_PARTS_CHARACTERISTIC = HOME_PARTS + '-characteristic';
const HOME_PARTS_CHARACTERISTIC_NAME = HOME_PARTS + '-characteristic-name';
const HOME_PARTS_CHARACTERISTIC_OPTION = HOME_PARTS + '-characteristic-option';
const HOME_PARTS_CHARACTERISTIC_OPTION_NAME =
  HOME_PARTS_CHARACTERISTIC_OPTION + '-value';

const sectionHomePage = cySelector('home-section');

const sectionBike = cySelector(HOME_BIKE + '-section');
const sectionBikeTitle = cySelector(HOME_BIKE + '-section-title');

const homeParts = cySelector(HOME_PARTS);
const homePartsName = cySelector(HOME_PARTS + '-name');
const sectionParts = cySelector(HOME_PARTS + '-section');
const sectionPartsTitle = cySelector(HOME_PARTS + '-section-title');
const partsCharacteristic = cySelector(HOME_PARTS_CHARACTERISTIC);
const partsCharacteristicOptionTitle = cySelector(
  HOME_PARTS_CHARACTERISTIC + '-option-title'
);
const partsCharacteristicName = cySelector(HOME_PARTS_CHARACTERISTIC_NAME);
const partsCharacteristicOption = cySelector(HOME_PARTS_CHARACTERISTIC_OPTION);
const partsCharacteristicOptionName = cySelector(
  HOME_PARTS_CHARACTERISTIC_OPTION_NAME
);

const bikeSelectedParts = cySelector(HOME_BIKE + '-selected-parts');
const bikeSelectedPart = cySelector(HOME_BIKE + '-selected-part');

const homeSelectors = {
  sectionHomePage,
  sectionBike,
  sectionBikeTitle,
  bikeSelectedParts,
  bikeSelectedPart,
  homeParts,
  sectionParts,
  homePartsName,
  sectionPartsTitle,
  partsCharacteristic,
  partsCharacteristicName,
  partsCharacteristicOption,
  partsCharacteristicOptionName,
  partsCharacteristicOptionTitle,
};

export default homeSelectors;
