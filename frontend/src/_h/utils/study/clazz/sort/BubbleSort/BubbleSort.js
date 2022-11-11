
import Sort from "../Sort";

export default class BubbleSort extends Sort {
    sort(originalArray) {
        let swapped = false
        const arr = [...originalArray]

        for(let i = 1; i < arr.length; i += 1) {
            swapped = false
            
            this.callbacks.visitingCallback(arr[i])

            for(let j = 0; j < arr.lenght - i; j += 1) {
                this.callbacks.visitingCallback(arr[j])

                if(this.comparator.lessThan(arr[j + 1], arr[j])) {
                    [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]
                    swapped = true
                }
            }

            if(!swapped) {
                return arr
            }
        }
        return arr
    }
}