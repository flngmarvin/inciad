function lruCache(maxsize) {
    if (maxsize <= 0) throw new Error("maxsize must be greater than 0");

    const cache = new Map();

    return {
        get(key) {
            if (!cache.has(key)) {
                return undefined;
            }
            // Move key to the end to mark it as recently used
            const value = cache.get(key);
            cache.delete(key);
            cache.set(key, value);
            return value;
        },
        set(key, value) {
            if (cache.has(key)) {
                // Remove existing key to update its position
                cache.delete(key);
            } else if (cache.size >= maxsize) {
                // Evict the least recently used item
                const firstKey = cache.keys().next().value;
                cache.delete(firstKey);
            }
            // Insert the item, marking it as the most recently used
            cache.set(key, value);
        },
        // Optional: For debugging purposes
        print() {
            console.log([...cache.entries()]);
        }
    };
}

// Example usage:
const cache = lruCache(3);
cache.set('a', 1);
cache.set('b', 2);
cache.set('c', 3);

console.log(cache.get('a')); // 1
cache.set('d', 4); // 'b' will be evicted

console.log(cache.get('b')); // undefined
console.log(cache.get('c')); // 3
console.log(cache.get('d')); // 4

// Optional: Print the current state of the cache
cache.print(); // Should print [['a', 1], ['c', 3], ['d', 4]]
