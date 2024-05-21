export class Property {
  constructor(
    public id: number,
    public name: string = '', 
    public streetName: string = '', 
    public buildingNo: string = '', 
    public description: string = '', 
    public rentAmount: number = 0, 
    public utilityCost: number = 0, 
    public deposit: number = 0,
    public livingRooms: number = 0,
    public photos?: { id: number, photo: string, isMain: boolean }[], // Define photos as optional
    public address?: string  // Adding address if it's a single field
  ) {}

  public getFullCost(): number {
    return this.rentAmount + this.utilityCost + this.deposit;
  }
}
