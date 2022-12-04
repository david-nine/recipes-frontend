export interface IngredientDTO {
  id: number;
  name: string;
  quantity: number;
  unit: UnitType;
}

export enum UnitType {
  LT = 'l',
  ML = 'ml',
  GR = 'g',
  KG = 'kg',
  CP = 'cup',
  SS = 'souSpoon',
  CC = 'teaspoon',
  QT = 'quantity'
}
