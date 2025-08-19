export class Stack<T> {
  private items: T[] = [];

  push(item: T): void {
    this.items.push(item);
  }

  pop(): T | undefined {
    return this.items.pop();
  }

  peek(): T | undefined {
    return this.items[this.items.length - 1];
  }

  isEmpty(): boolean {
    return this.items.length === 0;
  }

  visualize(): void {
    console.log("PILHA");
    console.log("-------");
    if (this.items.length === 0) {
      console.log("(pilha vazia)");
    } else {
      for (let i = this.items.length - 1; i >= 0; i--) {
        console.log(`| ${this.items[i]} |`);
        console.log("-------");
      }
    }
  }
}