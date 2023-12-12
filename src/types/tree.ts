export type TNode = {
  key: string;
  value: any;
  childs?: TNode[];
};

export type OnNodeClickType = (item, items) => Promise<void> | void;
