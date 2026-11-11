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
}

const test = new HashMap();

console.log(test.hash("test"));
