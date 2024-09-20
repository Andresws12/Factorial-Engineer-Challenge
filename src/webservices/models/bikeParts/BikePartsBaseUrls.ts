import { apiPrefix } from '@/webservices/consts';

/* This line of code is defining a constant variable named `bikePartsBaseUrl` of type string. It is
assigning the result of calling the `apiPrefix` function with the argument `'/bike-parts'` to this
constant variable. The `apiPrefix` function is likely used to construct the base URL for the bike
parts web service by appending the provided path to a predefined API prefix. This constant
`bikePartsBaseUrl` is then used to build other URLs related to the bike parts web service. */
export const bikePartsBaseUrl: string = apiPrefix('/bike-parts');

/* This code snippet is defining an object named `bikePartsWebserviceBaseUrls` with a property
`getAllBikeParts`. The value of `getAllBikeParts` is a string that concatenates the
`bikePartsBaseUrl` constant with the `/parts` string. This object is used to store different URLs
related to the bike parts web service, and in this case, it specifically stores the URL for getting
all bike parts. */
export const bikePartsWebserviceBaseUrls = {
  getAllBikeParts: `${bikePartsBaseUrl}/parts`,
};
