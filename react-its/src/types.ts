type ParsedComponent = {
  name: string;
  id: string;
  parent: string | null;
  props: Record<string, string>;
};

type ITS = {
  id: string;
  text: string;
  answer: string;
  correctMessage: string;
  incorrectMessage: string;
  showInput: boolean; 
};

export type { ParsedComponent, ITS };
