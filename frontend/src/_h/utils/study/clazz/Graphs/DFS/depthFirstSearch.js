import Graph from "../../datastructures/Graph/Graph.js";
import GraphEdge from "../../datastructures/Graph/GraphEdge.js";
import GraphVertex from "../../datastructures/Graph/GraphVertex.js";


const depthFirstSearchRecursive = (graph, currentVertex, previousVertex, res = []) => {
    res.push({currentVertex, previousVertex})

    graph.getNeighbors(currentVertex).forEach((nextVertex) => {
        depthFirstSearchRecursive(graph, nextVertex, currentVertex, res);
    })
    return res
}


const graph = new Graph(true)

const vertexA = new GraphVertex('A');
const vertexB = new GraphVertex('B');
const vertexC = new GraphVertex('C');

const edgeAB = new GraphEdge(vertexA, vertexB);
const edgeBC = new GraphEdge(vertexB, vertexC);

graph.addEdge(edgeAB)
graph.addEdge(edgeBC)

const res = depthFirstSearchRecursive(graph, vertexA, null)
console.log(res)
