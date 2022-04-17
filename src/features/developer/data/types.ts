export type CreateDeveloper = {
  name: string;
  sex: string;
  birth_date: string;
  age: number;
  hobby: string;
  level_id: number;
};

export type UpdateDeveloper = {
  id: number;
  name: string;
  sex: string;
  birth_date: string;
  age: number;
  hobby: string;
  level_id: number;
};
