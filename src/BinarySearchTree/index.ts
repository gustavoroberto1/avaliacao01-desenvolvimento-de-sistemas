import { Comparator, Node } from "../Node";

export class BinarySearchTree<T> {
  private root: Node<T> | null = null;
  private compare: Comparator<T>;

  constructor(compare: Comparator<T>) {
    this.compare = compare;
  }

  add(value: T): void {
    const insert = (n: Node<T> | null, v: T): Node<T> => {
      if (!n) return new Node(v);
      const c = this.compare(v, n.value);
      if (c < 0) n.left = insert(n.left, v);
      else if (c > 0) n.right = insert(n.right, v);
      return n;
    };
    this.root = insert(this.root, value);
  }

  remove(value: T): boolean {
    let removed = false;

    const minNode = (n: Node<T>): Node<T> => (n.left ? minNode(n.left) : n);

    const del = (n: Node<T> | null, v: T): Node<T> | null => {
      if (!n) return null;
      const c = this.compare(v, n.value);

      if (c < 0) {
        n.left = del(n.left, v);
      } else if (c > 0) {
        n.right = del(n.right, v);
      } else {
        removed = true;
        // nó com 0 ou 1 filho
        if (!n.left) return n.right;
        if (!n.right) return n.left;
        // 2 filhos: substitui pelo sucessor
        const succ = minNode(n.right);
        n.value = succ.value;
        n.right = del(n.right, succ.value);
      }
      return n;
    };

    this.root = del(this.root, value);
    return removed;
  }

  visualize(): string {
    console.log("-----BINARY SEARCH TREE-----");
    const lines: string[] = [];
    const walk = (n: Node<T> | null, prefix = '', isLeft = false) => {
      if (!n) return;
      if (n.right) walk(n.right, prefix + (isLeft ? '│   ' : '    '), false);
      lines.push(prefix + (isLeft ? '└── ' : '┌── ') + String(n.value));
      if (n.left) walk(n.left, prefix + (isLeft ? '    ' : '│   '), true);
    };
    walk(this.root);
    return lines.join('\n') || '(vazia)';
  }
}