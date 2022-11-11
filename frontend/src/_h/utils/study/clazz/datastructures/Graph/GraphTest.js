import GraphVertex from "./GraphVertex.js";
import GraphEdge from './GraphEdge.js';

const vertexA = new GraphVertex('A');
const vertexB = new GraphVertex('B');

const edgeAB = new GraphEdge(vertexA, vertexB);
vertexA.addEdge(edgeAB);

console.log(vertexA.findEdge(vertexB))