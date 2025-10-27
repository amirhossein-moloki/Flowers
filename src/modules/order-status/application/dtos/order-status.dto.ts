export class OrderStatusDto {
  id: string;
  code: string;
  name: string;
  display_order: number;
  is_terminal: boolean;

  constructor(
    id: string,
    code: string,
    name: string,
    display_order: number,
    is_terminal: boolean,
  ) {
    this.id = id;
    this.code = code;
    this.name = name;
    this.display_order = display_order;
    this.is_terminal = is_terminal;
  }
}