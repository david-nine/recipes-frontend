export interface IngredientDTO {
  id: number;
  name: string;
  quantity: number;
  unit: UnitType;
}

export enum UnitType {
  LT = 'Liters',
  ML = 'Milliliters',
  GR = 'Grams',
  KG = 'Kilograms',
  CP = 'Cup',
  SS = 'Sou Spoon',
  CC = 'Teaspoon',
  QT = 'Quantity'
}
