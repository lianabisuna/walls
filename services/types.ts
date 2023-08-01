export interface ErrorResponse<Data = {}, Errors = {}> {
  error: {
    message?: string;
    errors?: Errors;
    data?: Data;
  }
}

export interface SuccessResponse<Data = {}> {
  success: { 
    message: string; 
    data: Data;
  };
}