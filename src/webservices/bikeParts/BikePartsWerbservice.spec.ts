import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { getAllParts } from './BikePartsWebservice'; // Adjust the import path as needed
import { bikePartsWebserviceBaseUrls } from '@/webservices/models/bikeParts/BikePartsBaseUrls';
import catalogParts from '@/assets/data/catalogParts.json';

describe('BikePartsWebservice', () => {
  it('getAllParts - should fetch and return all parts', async () => {
    const mock = new MockAdapter(axios);

    mock
      .onGet(bikePartsWebserviceBaseUrls.getAllBikeParts)
      .reply(200, catalogParts);

    const parts = await getAllParts();

    expect(parts).toEqual(catalogParts);

    mock.restore();
  });
});
