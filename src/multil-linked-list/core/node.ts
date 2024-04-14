import { MultipleLinkedValue } from "./value";

export class MultipleLinkedListNode<
  T extends MultipleLinkedValue = MultipleLinkedValue
> {
  /**
   * @param {T} value - The value of the current node
   * @param {MultipleLinkedListNode<T>[]} [children] - The children linked list
   * @param {MultipleLinkedListNode<T>} next - The next node
   */
  constructor(
    value: T,
    children?: MultipleLinkedListNode<T>[],
    next?: MultipleLinkedListNode<T>
  ) {
    this._value = value;
    this._children = children || [];
    this._next = next || undefined;
  }

  protected _value: T;
  get value(): T {
    return this._value;
  }

  protected _children: MultipleLinkedListNode<T>[];
  get children(): MultipleLinkedListNode<T>[] {
    return this._children;
  }

  protected _next?: MultipleLinkedListNode<T>;
  get next(): MultipleLinkedListNode<T> | undefined {
    return this._next;
  }

  /**
   * Inserts a child node into the children array of the current node based on priority.
   *
   * This method inserts a child node into the children array of the current node
   * while maintaining the order based on priority. If the child node does not have
   * a priority assigned, it sets a default priority based on the current number of children.
   *
   * @param childrenNode The child node to be inserted into the children array.
   */
  insertChildrenByPriority(childrenNode: MultipleLinkedListNode<T>): void {
    const priority = childrenNode.value.priority;

    if (!priority) {
      childrenNode.value.setPriority(this.children.length + 1);
      this.children.push(childrenNode);
      return;
    }

    let index = 0;

    // 找到合适的插入位置
    for (let i = 0; i < this.children.length; i++) {
      if ((this.children[i].value.priority ?? 0) <= priority) {
        index = i + 1;
      }
    }

    // 插入元素到数组
    this.children.splice(index, 0, childrenNode);
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
    const result: T[] = [];

    function traverse(node: MultipleLinkedListNode<T>): void {
      const { children, next, value } = node;

      result.push(value);

      // 递归处理子节点和兄弟节点
      children?.forEach((child) => {
        traverse(child);
      });

      next && traverse(next);
    }

    traverse(this);

    return result;
  }

  /**
   * Appends a node to the end of the multiple linked list.
   *
   * This method finds the last node in the multiple linked list
   * and then appends the provided node to its '_next' property.
   *
   * @param node The node to be appended to the end of the linked list.
   */
  append(node: MultipleLinkedListNode): void {
    const lastNode = this.lastNode;

    lastNode._next = node;
  }

  /**
   * Retrieves the last node in the multiple linked list.
   *
   * This method recursively traverses the linked list starting from the current node
   * and returns the last node encountered. It does so by recursively moving to the
   * next node until it reaches the last node, which is identified by having no next node.
   *
   * @returns The last node in the multiple linked list.
   */
  get lastNode(): MultipleLinkedListNode {
    function traverse(node: MultipleLinkedListNode): MultipleLinkedListNode {
      return node.next ? traverse(node.next) : node;
    }

    return traverse(this);
  }
}
