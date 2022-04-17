export type DeveloperData = {
  id: number;
  name: string;
  sex: string;
  birth_date: string;
  age: number;
  hobby: string;
  level_id: number;
  level: {
    id: number;
    level: string;
    slug: string;
  };
};
