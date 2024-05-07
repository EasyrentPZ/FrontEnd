export class Property {
    //buildingNo - string, żeby można było dać np 5/11, można rozbić na 2 pola
    constructor(public name :string, public street :string, 
        public buildingNo :string, public description :string, 
        public rent :number, public utilityCosts :number, public deposit :number){

        }

    public getFullCost() :number{
        return this.rent + this.deposit + this.utilityCosts;
    }
}