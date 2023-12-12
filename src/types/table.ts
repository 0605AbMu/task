export type TColumn = {
  propName: string | null;
  title: string;
  order?: number;
  [key: string]: any;
};

export type OnTableRowClickType = (item, items) => Promise<void> | void;
