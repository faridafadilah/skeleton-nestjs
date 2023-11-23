export class ResponseAPI {
  statusCode: number;
  message: string;
  data: any;

  constructor(params: { statusCode: number; message: string; data?: any }) {
    this.statusCode = params.statusCode;
    this.message = params.message;
    this.data = params.data || null;
  }
}
