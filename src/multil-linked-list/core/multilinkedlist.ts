import { MultipleLinkedListNode } from "./node";
import { MultipleLinkedValue } from "./value";

export class MultipleLinkedList<
  T extends MultipleLinkedValue = MultipleLinkedValue
> {
  constructor(root: MultipleLinkedListNode<T>) {
    this._root = root;
  }

  protected _root: MultipleLinkedListNode<T>;
  get root(): MultipleLinkedListNode<T> {
    return this._root;
  }

  /**
   * Flattens the multiple linked list into a one-dimensional array.
   *
   * This method recursively traverses the multiple linked list and
   * constructs a one-dimensional array containing the values of all nodes.
   *
   * @returns An array containing the values of all nodes in the multiple linked list.
   */
  flatten(): T[] {
    return this._root.flatten();
  }

  /**
   * Appends a node to the end of the multiple linked list.
   *
   * This method finds the last node in the multiple linked list
   * and then appends the provided node to its '_next' property.
   *
   * @param node The node to be appended to the end of the linked list.
   */
  append(node: MultipleLinkedListNode<T> | MultipleLinkedList<T>): void {
    this._root.append(node instanceof MultipleLinkedList ? node.root : node);
  }
}
