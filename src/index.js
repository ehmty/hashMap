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
}

const test = new HashMap();

test.set("apple", "red");
test.set("banana", "yellow");

console.log(test);
