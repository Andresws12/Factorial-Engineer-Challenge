import { ref } from 'vue';
import { defineStore } from 'pinia';

import { Parts } from '@/models/Parts';

import { getAllParts } from '@/webservices/bikeParts/BikePartsWebservice';

export const usePartsStore = defineStore('parts', () => {
  const partsData = ref<Parts | null>(null);

  /**
   * The function `getParts` asynchronously retrieves all parts data and assigns it to a variable,
   * handling any errors that may occur.
   */
  const getParts = async (): Promise<void> => {
    try {
      const response: Parts | null = await getAllParts();

      partsData.value = response;
    } catch (error) {
      console.error(error);
    }
  };

  return {
    partsData,
    getParts,
  };
});
