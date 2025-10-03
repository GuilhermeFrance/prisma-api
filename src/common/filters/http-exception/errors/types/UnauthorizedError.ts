export class UnauthorizedError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'UnauthorizedError'; // Define o nome da classe de erro.
  }
}
