import { Comparator, Node } from "../Node";

export class AVLTree<T> {
  private root: Node<T> | null = null;
  private compare: Comparator<T>;

  constructor(compare: Comparator<T>) {
    this.compare = compare;
  }

  private h(n: Node<T> | null): number {
    return n?.height ?? 0;
  }
  private update(n: Node<T>): void {
    n.height = Math.max(this.h(n.left), this.h(n.right)) + 1;
  }
  private balanceFactor(n: Node<T> | null): number {
    if (!n) return 0;
    return this.h(n.left) - this.h(n.right);
  }

  private rotateRight(y: Node<T>): Node<T> {
    const x = y.left!;
    const T2 = x.right;
    x.right = y;
    y.left = T2;
    this.update(y);
    this.update(x);
    return x;
  }

  private rotateLeft(x: Node<T>): Node<T> {
    const y = x.right!;
    const T2 = y.left;
    y.left = x;
    x.right = T2;
    this.update(x);
    this.update(y);
    return y;
  }

  private rebalance(n: Node<T>): Node<T> {
    this.update(n);
    const bf = this.balanceFactor(n);

    if (bf > 1) {
      if (this.balanceFactor(n.left) < 0) n.left = this.rotateLeft(n.left!); // LR
      return this.rotateRight(n); // LL
    }
    if (bf < -1) {
      if (this.balanceFactor(n.right) > 0) n.right = this.rotateRight(n.right!); // RL
      return this.rotateLeft(n); // RR
    }
    return n;
  }

  add(value: T): void {
    const insert = (n: Node<T> | null, v: T): Node<T> => {
      if (!n) return new Node(v);
      const c = this.compare(v, n.value);
      if (c < 0) n.left = insert(n.left, v);
      else if (c > 0) n.right = insert(n.right, v);
      // iguais: ignora
      return this.rebalance(n);
    };
    this.root = insert(this.root, value);
  }

  remove(value: T): boolean {
    let removed = false;

    const minNode = (n: Node<T>): Node<T> => (n.left ? minNode(n.left) : n);

    const del = (n: Node<T> | null, v: T): Node<T> | null => {
      if (!n) return null;

      const c = this.compare(v, n.value);
      if (c < 0) n.left = del(n.left, v);
      else if (c > 0) n.right = del(n.right, v);
      else {
        removed = true;
        if (!n.left || !n.right) {
          const child = n.left ?? n.right;
          n = child ?? null;
        } else {
          const succ = minNode(n.right);
          n.value = succ.value;
          n.right = del(n.right, succ.value);
        }
      }

      if (!n) return null; // atingiu folha
      return this.rebalance(n);
    };

    this.root = del(this.root, value);
    return removed;
  }

  visualize(): string {
    console.log("-----AVL TREE-----");
    const lines: string[] = [];
    const walk = (n: Node<T> | null, prefix = "", isLeft = false) => {
      if (!n) return;
      if (n.right) walk(n.right, prefix + (isLeft ? "│   " : "    "), false);
      lines.push(
        prefix +
          (isLeft ? "└── " : "┌── ") +
          String(n.value) +
          ` [h=${n.height}]`
      );
      if (n.left) walk(n.left, prefix + (isLeft ? "    " : "│   "), true);
    };
    walk(this.root);
    return lines.join("\n") || "(vazia)";
  }
}
