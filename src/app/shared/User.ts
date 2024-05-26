export class User {
    name: string = '';
    lastname: string = '';
    phoneNumber: string = '';
    email: string = '';
    roles: string[] = [];
  
    constructor(data: any) {
      this.name = data.name || '';
      this.lastname = data.lastname || '';
      this.phoneNumber = data.phoneNumber || '';
      this.email = data.email || '';
      this.roles = data.roles || [];
    }
  }
  