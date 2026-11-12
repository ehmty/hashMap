class HashMap {
  capacity = 16;
  loadFactor = 0.75;

  hash(key) {
    let hashCode = 0;
    const primeNumber = 31;

    for (let i = 0; i < key.length; i++) {
      hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.capacity;
    }

    return hashCode;
  }

  getBucket(key) {
    return this.buckets[this.hash(key)];
  }

  set(key, value) {
    const bucket = this.getBucket(key);

    for (const entry of bucket) {
      if (entry.key === key) {
        entry.value = value;
        return;
      }
    }

    bucket.push({ key, value });
    this.size++;
  }

  get(key) {
    const bucket = this.getBucket(key);

    for (const entry of bucket) {
      if (entry.key === key) return entry.value;
    }
  }
}

const test = new HashMap();

console.log(test.hash("test"));
