import { Equals, Node } from "../Node";

export class BinaryTree<T> {
  private root: Node<T> | null = null;
  private equals: Equals<T>;

  constructor(equals?: Equals<T>) {
    this.equals = equals ?? ((a, b) => a === (b as any));
  }

  add(value: T): void {
    const newNode = new Node(value);
    if (!this.root) {
      this.root = newNode;
      return;
    }

    const q: Node<T>[] = [this.root];
    while (q.length) {
      const cur = q.shift()!;
      if (!cur.left) {
        cur.left = newNode;
        return;
      } else q.push(cur.left);

      if (!cur.right) {
        cur.right = newNode;
        return;
      } else q.push(cur.right);
    }
  }

  remove(value: T): boolean {
    if (!this.root) return false;

    if (
      !this.root.left &&
      !this.root.right &&
      this.equals(this.root.value, value)
    ) {
      this.root = null;
      return true;
    }

    let target: Node<T> | null = null;
    let last: Node<T> | null = null;
    let parentOfLast: Node<T> | null = null;

    const q: Node<T>[] = [this.root];
    while (q.length) {
      const cur = q.shift()!;
      if (this.equals(cur.value, value)) target = cur;

      if (cur.left) {
        parentOfLast = cur;
        last = cur.left;
        q.push(cur.left);
      }
      if (cur.right) {
        parentOfLast = cur;
        last = cur.right;
        q.push(cur.right);
      }
    }

    if (!target || !last) return false;

    target.value = last.value;

    if (parentOfLast?.right === last) parentOfLast.right = null;
    else if (parentOfLast?.left === last) parentOfLast.left = null;
    else if (this.root === last) this.root = null;

    return true;
  }

  visualize(): string {
    console.log("-----BINARY TREE-----");
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
