class HashMap {
  capacity = 16;
  loadFactor = 0.75;
  buckets = Array.from({ length: this.capacity }, () => []);
  size = 0;

  hash(key) {
    let hashCode = 0;
    const primeNumber = 31;

    for (let i = 0; i < key.length; i++) {
      hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.capacity;
    }

    return hashCode;
  }

  getBucket(key) {
    const index = this.hash(key);

    if (index < 0 || index >= this.buckets.length) {
      throw new Error("Trying to access index out of bounds");
    }

    return this.buckets[index];
  }

  resize() {
    const entries = this.entries();
    this.capacity *= 2;
    this.buckets = Array.from({ length: this.capacity }, () => []);

    for (const [key, value] of entries) {
      this.getBucket(key).push({ key, value });
    }
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

    if (this.size / this.capacity > this.loadFactor) {
      this.resize();
    }
  }

  get(key) {
    const bucket = this.getBucket(key);

    for (const entry of bucket) {
      if (entry.key === key) return entry.value;
    }
  }

  has(key) {
    const bucket = this.getBucket(key);

    for (const entry of bucket) {
      if (entry.key === key) return true;
    }

    return false;
  }

  remove(key) {
    const bucket = this.getBucket(key);

    for (const entry of bucket) {
      if (entry.key === key) {
        bucket.splice(bucket.indexOf(entry), 1);
        this.size--;
        return true;
      }
    }
    return false;
  }

  length() {
    return this.size;
  }

  clear() {
    this.buckets = Array.from({ length: this.capacity }, () => []);
    this.size = 0;
  }

  keys() {
    const keys = [];

    for (const bucket of this.buckets) {
      for (const entry of bucket) {
        keys.push(entry.key);
      }
    }

    return keys;
  }

  values() {
    const values = [];

    for (const bucket of this.buckets) {
      for (const entry of bucket) {
        values.push(entry.value);
      }
    }

    return values;
  }

  entries() {
    const entries = [];

    for (const bucket of this.buckets) {
      for (const entry of bucket) {
        entries.push([entry.key, entry.value]);
      }
    }

    return entries;
  }
}

class HashSet {
  capacity = 16;
  loadFactor = 0.75;
  buckets = Array.from({ length: this.capacity }, () => []);
  size = 0;

  hash(key) {
    let hashCode = 0;
    const primeNumber = 31;

    for (let i = 0; i < key.length; i++) {
      hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.capacity;
    }

    return hashCode;
  }

  getBucket(key) {
    const index = this.hash(key);

    if (index < 0 || index >= this.buckets.length) {
      throw new Error("Trying to access index out of bounds");
    }

    return this.buckets[index];
  }

  resize() {
    const keys = this.keys();
    this.capacity *= 2;
    this.clear();

    for (const key of keys) {
      this.add(key);
    }
  }

  add(key) {
    const bucket = this.getBucket(key);

    if (bucket.includes(key)) return;

    bucket.push(key);
    this.size++;

    if (this.size / this.capacity > this.loadFactor) {
      this.resize();
    }
  }

  has(key) {
    return this.getBucket(key).includes(key);
  }

  remove(key) {
    const bucket = this.getBucket(key);
    const index = bucket.indexOf(key);

    if (index === -1) return false;

    bucket.splice(index, 1);
    this.size--;
    return true;
  }

  length() {
    return this.size;
  }

  clear() {
    this.buckets = Array.from({ length: this.capacity }, () => []);
    this.size = 0;
  }

  keys() {
    const keys = [];

    for (const bucket of this.buckets) {
      for (const entry of bucket) {
        keys.push(entry);
      }
    }

    return keys;
  }
}

export { HashMap, HashSet };
