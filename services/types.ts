export interface ErrorResponse<Data = {}, Errors = {}> {
  message?: string;
  errors?: Errors;
  data?: Data;
}

export interface SuccessResponse<Data = {}> {
  message: string; 
  data: Data;
}