class Helper {
    static convertJsonIntoHashMap(json) {
      const hashMap = new Map();
      for (const [key, value] of Object.entries(json)) {
        hashMap.set(key, value);
      }
      return hashMap;
    }

}

export default Helper;