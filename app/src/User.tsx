export class User {
  isLogged = false;

  constructor() {
    this.isLogged = false;
  }

  getIsLogged() {
    return this.isLogged;
  }

  setIsLogged(isLogged: boolean) {
    this.isLogged = isLogged;
  }
}

export const user = new User();
