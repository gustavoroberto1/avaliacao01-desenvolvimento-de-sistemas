export type Comparator<T> = (a: T, b: T) => number;
export type Equals<T> = (a: T, b: T) => boolean;

export class Node<T> {
  constructor(
    public value: T,
    public left: Node<T> | null = null,
    public right: Node<T> | null = null,
    public height: number = 1 
  ) {}
}
