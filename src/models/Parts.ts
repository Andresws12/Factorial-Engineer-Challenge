export enum DependencyType {
  Requires = 'requires',
  Excludes = 'excludes',
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
  type: DependencyType.Requires | DependencyType.Excludes;
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
