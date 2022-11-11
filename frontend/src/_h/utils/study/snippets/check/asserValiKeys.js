const asserValidKeys = (obj, keys) => {
    Object.keys(obj).every(key => keys.includes(key))
}

