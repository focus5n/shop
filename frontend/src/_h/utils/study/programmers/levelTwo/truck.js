class Truck {
    constructor(weight, time) {
        this.weight = weight
        this.time = time
    }

    goTruck() {
        this.time += 1
    }

    getWeight() {
        return this.weight
    }

    getTime() {
        return this.time
    }


}

const solution = (bridge_length, weight, truck_weights) => {
    let trucks = []
    let answer = 1
    trucks.push(new Truck(truck_weights.shift(), 1))
    while (truck_weights.length > 0 || trucks.length > 0) {
        trucks.map((value) => value.goTruck())
        trucks = trucks.filter((value) => value.getTime() !== bridge_length + 1)
        answer += 1
        const totalWeight = trucks.reduce((acc, value) => acc += value.getWeight(), 0)
        if (weight - (totalWeight + truck_weights[0]) >= 0) {
            trucks.push(new Truck(truck_weights.shift(), 1))
        }
    }

    return answer
}

solution(100, 100, [10,10,10,10,10,10,10,10,10,10])

