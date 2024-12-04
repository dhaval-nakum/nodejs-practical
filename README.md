# LRU Cache Implementation

## Project Overview

This project implements an **LRU (Least Recently Used)** cache in **Node.js**. The cache uses a **Doubly Linked List** and a **Hash Map** to efficiently manage key-value pairs with the LRU eviction policy.

## Environment Setup

- **Node Version**: 22.12.0
- **Development Editor**: Visual Studio Code
- **VS Code Version**: 1.95.3
- **Development OS**: macOS
- **OS Version**: macOS Sequoia (15.1-24B83)

## Project Features

- **LRU Eviction Policy**: The cache evicts the least recently used item when the cache exceeds its defined capacity.
- **Operations**:
  - **get(key)**: Retrieves the value associated with the key. Returns `-1` if the key does not exist.
  - **put(key, value)**: Inserts or updates a key-value pair. If the cache exceeds its capacity, the least recently used item is evicted.
- **Time Complexity**: Both `get` and `put` operations are optimized for **O(1)** time complexity using a combination of a **Hash Map** and a **Doubly Linked List**.

## Data Structures

### 1. **Hash Map (Cache)**

The cache is backed by a **Map** object to provide O(1) time complexity for accessing the values associated with the keys.

### 2. **Doubly Linked List**

A **Doubly Linked List** is used to maintain the order of access for the cache keys:

- The **most recently used** items are near the **head**.
- The **least recently used** items are near the **tail**.

The doubly linked list nodes contain:

- **key**: The key associated with the node.
- **value**: The value associated with the key.
- **prev**: Pointer to the previous node.
- **next**: Pointer to the next node.

---

## Working of the LRU Cache

### 1. **Initialization**

- The LRU Cache is initialized with a given **capacity**.
- Two dummy nodes are created: **head** and **tail**.
  - The **head** points to the first node in the list (most recently used).
  - The **tail** points to the last node in the list (least recently used).
- The doubly linked list helps manage the ordering of cache access, and the map ensures efficient O(1) access to the keys and values.

### 2. **Operations**

#### `get(key)`

- **Objective**: Retrieves the value associated with a given `key`.
- **Steps**:
  1. Check if the `key` exists in the cache (`Map`).
  2. If found:
     - Remove the node from its current position in the doubly linked list.
     - Insert the node at the front of the list (marking it as most recently used).
     - Return the node's value.
  3. If not found, return `-1`.

#### `put(key, value)`

- **Objective**: Insert or update a key-value pair in the cache.
- **Steps**:
  1. If the `key` exists, update its value and move it to the front (most recently used).
  2. If the `key` doesn't exist:
     - Check if the cache has reached its maximum capacity:
       - If full, evict the least recently used node (located just before the `tail`).
     - Create a new node for the given `key` and `value`.
     - Insert the new node at the front of the list (most recently used).
     - Add the new node to the cache map.

### 3. **Eviction Policy**

- When the cache exceeds its capacity, the least recently used node (located just before the `tail` in the doubly linked list) is evicted.
- This eviction ensures that the cache always maintains the most recently used items within the defined capacity.

---

## Code Explanation

### **DoublyLinkedListNode Class**

This class represents a node in the doubly linked list:

- `key`: The key associated with the node.
- `value`: The value associated with the key.
- `prev`: Pointer to the previous node in the list.
- `next`: Pointer to the next node in the list.

### **LRUCache Class**

- **Constructor**: Initializes the cache with a capacity and sets up the dummy head and tail nodes for the doubly linked list.
- **`get(key)`**: Retrieves the value for the given `key` and moves it to the front of the list if found.
- **`put(key, value)`**: Inserts or updates the cache. If the cache is full, the least recently used item is evicted.
- **Helper Methods**:
  - **`removeNode(node)`**: Removes a node from its current position in the doubly linked list.
  - **`insertNode(node)`**: Inserts a node at the front of the doubly linked list (marking it as most recently used).

---

## Example Usage

```javascript
const cache = new LRUCache(3); // Create an LRU cache with capacity of 3
cache.put(1, 1); // Cache: {1=1}
cache.put(2, 2); // Cache: {1=1, 2=2}
console.log(cache.get(1)); // Returns 1, Cache: {2=2, 1=1}
cache.put(3, 3); // Cache: {2=2, 1=1, 3=3}
console.log(cache.get(2)); // Returns 2, Cache: {1=1, 3=3, 2=2}
cache.put(4, 4); // Evicts key 1, Cache: {3=3, 2=2, 4=4}
console.log(cache.get(1)); // Returns -1 (not found)
console.log(cache.get(3)); // Returns 3, Cache: {2=2, 4=4, 3=3}
```
