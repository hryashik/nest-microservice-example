
export interface IAuthorizedRequest extends Request {
  user: {
    id: number,
    email: string,
    updatedAt: string,
    createdAt: string
  }
}