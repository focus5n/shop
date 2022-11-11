import Graph from "../datastructures/Graph/Graph.js";
import GraphEdge from "../datastructures/Graph/GraphEdge.js";
import GraphVertex from "../datastructures/Graph/GraphVertex.js";
import QuickSort from "../sort/QuickSort/QuickSort.js";
import DisjoinSet from '../datastructures/DisjointSet/DisjoinSet.js';


const kruskal = (graph) => {
    if (graph.isDirected) {
        throw new Error('Kruskal\'s algorihtms works only for undefined graphs')
    }

    const minimumSpanningTree = new Graph()

    const sortingCallbacks = {
        compareCallback: (graphEdgeA, graphEdgeB) => {
            if (graphEdgeA.weight === graphEdgeB) {
                return 1
            }
            return graphEdgeA.weight <= graphEdgeB.weight ? -1 : 1
        }
    };
    const sortedEdges = new QuickSort(sortingCallbacks).sort(graph.getAllEdges());

    const keyCallback = (graphVertex) => graphVertex.getKey();
    const disjointSet = new DisjoinSet(keyCallback);

    graph.getAllVertices().forEach((graphVertex) => {
        disjointSet.makeSet(graphVertex);
    });

    console.log(sortedEdges)


    for (let edgeIndex = 0; edgeIndex < sortedEdges.length; edgeIndex += 1) {
        const currentEdge = sortedEdges[edgeIndex];

        if (!disjointSet.inSameSet(currentEdge.startVertex, currentEdge.endVertex)) {

            disjointSet.union(currentEdge.startVertex, currentEdge.endVertex);

            minimumSpanningTree.addEdge(currentEdge);
        }
    }
    //console.log(minimumSpanningTree)
    return minimumSpanningTree;
}



const vertexA = new GraphVertex('A');
const vertexB = new GraphVertex('B');
const vertexC = new GraphVertex('C');
const vertexD = new GraphVertex('D');
const vertexE = new GraphVertex('E');
// const vertexF = new GraphVertex('F');
// const vertexG = new GraphVertex('G');

const edgeAB = new GraphEdge(vertexA, vertexB, 3);
const edgeAE = new GraphEdge(vertexA, vertexE, 1);
const edgeBC = new GraphEdge(vertexB, vertexC, 5);
const edgeBE = new GraphEdge(vertexB, vertexE, 4);
const edgeEC = new GraphEdge(vertexE, vertexC, 6);
const edgeCD = new GraphEdge(vertexC, vertexD, 2);
const edgeED = new GraphEdge(vertexE, vertexD, 7);


const graph = new Graph();

graph
    .addEdge(edgeAB)
    .addEdge(edgeAE)
    .addEdge(edgeBC)
    .addEdge(edgeBE)
    .addEdge(edgeEC)
    .addEdge(edgeCD)
    .addEdge(edgeED)

kruskal(graph)