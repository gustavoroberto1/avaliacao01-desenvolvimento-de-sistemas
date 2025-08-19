import { AVLTree } from "./AVLTree";
import { BinarySearchTree } from "./BinarySearchTree";
import { BinaryTree } from "./BinaryTree";
import { Comparator } from "./Node";
import { Queue } from "./Queue";
import { Stack } from "./Stack";

const minhaPilha = new Stack<number>();
minhaPilha.push(10);
minhaPilha.push(20);
minhaPilha.push(30);
minhaPilha.visualize();

const minhaFila = new Queue<number>();
minhaFila.enqueue(40);
minhaFila.enqueue(50);
minhaFila.enqueue(60);
minhaFila.visualize();

const bt = new BinaryTree<number>();
[10, 20, 30, 40, 50, 60, 70].forEach((v) => bt.add(v));
console.log(bt.visualize());

const cmpNum: Comparator<number> = (a, b) => a - b;
const bst = new BinarySearchTree<number>(cmpNum);
[10, 5, 15, 3, 7, 12, 18].forEach((v) => bst.add(v));
console.log(bst.visualize());


const avl = new AVLTree<number>(cmpNum);
[10, 5, 15, 3, 7, 12, 18, 1, 4, 6, 8].forEach((v) => avl.add(v));
console.log(avl.visualize());