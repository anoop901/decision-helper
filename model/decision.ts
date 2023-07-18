export interface Option {
  name: string;
  pros: string[];
  cons: string[];
}

type Decision = Option[];

export default Decision;
