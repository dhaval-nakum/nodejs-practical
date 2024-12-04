class DoublyLinkedListNode {
  constructor(key, value) {
    this.key = key;
    this.value = value;
    this.prev = null;
    this.next = null;
  }
}

class LRUCache {
  constructor(capacity) {
    this.capacity = capacity;
    this.cache = new Map();
    this.head = new DoublyLinkedListNode(0, 0); // Dummy head
    this.tail = new DoublyLinkedListNode(0, 0); // Dummy tail
    this.head.next = this.tail;
    this.tail.prev = this.head;
  }

  // Helper function to remove a node from the doubly linked list
  removeNode(node) {
    node.prev.next = node.next;
    node.next.prev = node.prev;
  }

  // Helper function to insert a node right after the head (most recently used)
  insertNode(node) {
    node.next = this.head.next;
    node.prev = this.head;
    this.head.next.prev = node;
    this.head.next = node;
  }

  // Get the value of a key from the cache
  get(key) {
    if (!this.cache.has(key)) {
      return -1; // If the key doesn't exist, return -1
    }

    const node = this.cache.get(key);
    this.removeNode(node);
    this.insertNode(node); // Move the node to the front as it's recently used

    return node.value;
  }

  // Put a key-value pair into the cache
  put(key, value) {
    if (this.cache.has(key)) {
      // If the key exists, update the value and move the node to the front
      const node = this.cache.get(key);
      node.value = value;
      this.removeNode(node);
      this.insertNode(node);
    } else {
      if (this.cache.size >= this.capacity) {
        // If the cache is full, remove the least recently used (tail.prev)
        const lruNode = this.tail.prev;
        this.cache.delete(lruNode.key);
        this.removeNode(lruNode);
      }

      // Create a new node and insert it
      const newNode = new DoublyLinkedListNode(key, value);
      this.cache.set(key, newNode);
      this.insertNode(newNode);
    }
  }
}

// Example usage:
const cache = new LRUCache(3); // Set cache capacity to 3
cache.put(1, 1); // Cache: {1=1}
cache.put(2, 2); // Cache: {1=1, 2=2}
console.log(cache.get(1)); // Returns 1, Cache: {2=2, 1=1}
cache.put(3, 3); // Cache: {2=2, 1=1, 3=3}
console.log(cache.get(2)); // Returns 2, Cache: {1=1, 3=3, 2=2}
cache.put(4, 4); // Evicts key 1, Cache: {3=3, 2=2, 4=4}
console.log(cache.get(1)); // Returns -1 (not found)
console.log(cache.get(3)); // Returns 3, Cache: {2=2, 4=4, 3=3}
