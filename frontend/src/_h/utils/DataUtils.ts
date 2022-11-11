export class DataUtils {
  static store: Map<HTMLElement, Map<string, any>> = new Map()

  public static set(instance: HTMLElement | undefined, key: string, data: any): void {
    if(!instance) {
      return
    }

    const instanceData = DataUtils.store.get(instance)
    if(!instanceData) {
      const newMap = new Map().set(key, data)
      DataUtils.store.set(instance, newMap)
      return
    }
    instanceData.set(key, data)
  }

  public static get(instance: HTMLElement, key: string): any | undefined {
    const instanceData = DataUtils.store.get(instance)
    if(!instanceData) {
      return
    }
    return instanceData.get(key)
  }

  public static remove(instance: HTMLElement, key: string) : void {
    const instanceData = DataUtils.store.get(instance);
    if(!instanceData) {
      return
    }
    instanceData.delete(key)
  }

  public static has(instance: HTMLElement, key: string): boolean {
    const instanceData = DataUtils.store.get(instance)
    if(instanceData) {
      return instanceData.has(key)
    }
    return false
  }

  public static getAllInstaceByKey(key: string) {
    const result: any[] = []
    DataUtils.store.forEach((val) => {
      val.forEach((v, k) => {
        if(k === key) {
          result.push(v)
        }
      })
    })
    return false;
  }

}