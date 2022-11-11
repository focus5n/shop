import Graph from "../../datastructures/Graph/Graph.js";
import GraphEdge from "../../datastructures/Graph/GraphEdge.js";
import GraphVertex from "../../datastructures/Graph/GraphVertex.js";
import Queue from "../../datastructures/Queue/Queue.js";


const breadFirstSearchRecursive = (graph, startVertex, res = []) => {
    const vertexQueue = new Queue();

    vertexQueue.enqueue(startVertex);
    let previousVertex = null;

    while (!vertexQueue.isEmpty()) {
        const currentVertex = vertexQueue.dequeue();

        graph.getNeighbors(currentVertex).forEach((nextVertex) => {
            vertexQueue.enqueue(nextVertex);
        });

        previousVertex = currentVertex;
    }

    return vertexQueue
}


const graph = new Graph(true)

const vertexA = new GraphVertex('A');
const vertexB = new GraphVertex('B');
const vertexC = new GraphVertex('C');

const edgeAB = new GraphEdge(vertexA, vertexB);
const edgeBC = new GraphEdge(vertexB, vertexC);

graph.addEdge(edgeAB)
graph.addEdge(edgeBC)

const res = breadFirstSearchRecursive(graph, vertexA, null)
console.log(res)
