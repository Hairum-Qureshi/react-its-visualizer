type ParsedComponent = {
  id: string;
  parent: string | null;
  props: Record<string, string>;
};

export type { ParsedComponent };