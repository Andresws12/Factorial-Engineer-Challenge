import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import { getRequestConfig } from '@/webservices/consts';
import { bikePartsWebserviceBaseUrls } from '@/webservices/models/bikeParts/BikePartsBaseUrls';

import { Parts } from '@/models/Parts';

import catalogParts from '@/assets/data/catalogParts.json';

/**
 * The function getAllParts retrieves all bike parts from a web service using Axios and returns them as
 * a Promise.
 * @returns The function `getAllParts` returns a Promise that resolves to an object of type `Parts`.
 * The function makes a GET request to a specified URL to fetch all bike parts data and returns the
 * response data.
 */
export const getAllParts: () => Promise<Parts> = async () => {
  const mock = new MockAdapter(axios);
  mock
    .onGet(bikePartsWebserviceBaseUrls.getAllBikeParts)
    .reply(200, catalogParts);
  const response = await axios.get<Parts>(
    bikePartsWebserviceBaseUrls.getAllBikeParts,
    getRequestConfig()
  );
  return response.data;
};
