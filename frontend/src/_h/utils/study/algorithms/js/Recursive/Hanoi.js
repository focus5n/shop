export function TowerOfHanoi(n, from, to, aux, output = []) {
    if (n === 1) {
        output.push(`Move disk 1 from rod ${from} to rod ${to}`)
        return output
    }
    TowerOfHanoi(n - 1, from, aux, to, output)
    output.push(`Move disk ${n} from rod ${from} to rod ${to}`)
    TowerOfHanoi(n - 1, aux, to, from, output)
    return output
}


const n = 4
const result = TowerOfHanoi(n, 'A', 'C', 'B')
console.log(result)