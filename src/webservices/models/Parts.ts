export interface Characteristic {
  id: string;
  name: string;
}

export interface Option {
  id: string;
  value: string;
  basePrice: number;
  stock: number;
  prices: Price[];
  dependencies: Dependency[];
}

export interface Price {
  price: number;
  dependencies: Dependency[];
}

export interface Dependency {
  characteristicId: string;
  optionId: string;
  type: 'requires' | 'excludes';
}

export interface CharacteristicWithOptions {
  id: string;
  name: string;
  options: Option[];
}

export interface Part {
  id: string;
  name: string;
  characteristics: CharacteristicWithOptions[];
}

export type Parts = Part[];
