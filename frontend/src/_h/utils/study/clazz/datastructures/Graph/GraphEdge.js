import GraphVertex from "./GraphVertex.js"

export default class GraphEdge {
    constructor(startVertex, endVertex, weight = 0) {
        this.startVertex = startVertex
        this.endVertex = endVertex
        this.weight = weight
    }

    getKey() {
        const starVertexKey = this.startVertex.getKey()
        const endVertexKey = this.endVertex.getKey()
        
        return `${starVertexKey}_${endVertexKey}`
    }

    reverse() {
        const temp = this.startVertex
        this.startVertex = this.endVertex
        this.endVertex = temp

        return this
    }

    toStrign() {
        return this.getKey()
    }
}

