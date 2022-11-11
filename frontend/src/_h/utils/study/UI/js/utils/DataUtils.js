export class DataUtils {
    static store = new Map()

    static set(instance, key, data) {
        if (!instance) {
            return
        }

        const instanceData = DataUtils.store.get(instance)
        if (!instanceData) {
            const newMap = new Map().set(key, data)
            DataUtils.store.set(instance, newMap)
            return
        }
        instanceData.set(key, data)
    }

    static get(instance, key) {
        const instanceData = DataUtils.store.get(instance)
        if (!instanceData) {
            return
        }
        return instanceData.get(key)
    }

    static remove(instance, key) {
        const instanceData = DataUtils.store.get(instance);
        if (!instanceData) {
            return
        }
        instanceData.delete(key)
    }

    static has(instance, key) {
        const instanceData = DataUtils.store.get(instance)
        if (instanceData) {
            return instanceData.has(key)
        }
        return false
    }

    static getAllInstaceByKey() {
        const result = []
        DataUtils.store.forEach((val) => {
            val.forEach((v, k) => {
                if (k === key) {
                    result.push(v)
                }
            })
        })
        return false;
    }


}