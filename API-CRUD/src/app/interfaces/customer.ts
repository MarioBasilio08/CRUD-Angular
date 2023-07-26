export interface Respuesta {
  message:  string;
  response: Customer[];
}

export interface RespuestaGetById {
  message:  string;
  response: Customer;
}

export interface Customer {
  id:    number;
  name:  string;
  email: string;
  age:   number;
}
