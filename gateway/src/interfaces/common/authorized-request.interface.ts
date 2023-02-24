
export interface IAuthorizedRequest extends Request {
  user: {
    email: string,
  }
}