from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Dict, Any, Optional

app = FastAPI(title="VectorShift Pipeline API")

# CORS Configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:5173"],  # Vite port
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Request Model
class PipelineRequest(BaseModel):
    nodes: List[Dict[str, Any]]
    edges: List[Dict[str, Any]]

# Response Model
class PipelineResponse(BaseModel):
    num_nodes: int
    num_edges: int
    is_dag: bool

@app.get('/')
def read_root():
    """Health check endpoint"""
    return {'status': 'Backend is running!', 'message': 'Ping Pong'}

@app.post('/pipelines/parse', response_model=PipelineResponse)
def parse_pipeline(pipeline: PipelineRequest) -> PipelineResponse:
    """
    Parse pipeline and return:
    - Number of nodes
    - Number of edges
    - Whether it's a DAG (Directed Acyclic Graph)
    """
    nodes = pipeline.nodes
    edges = pipeline.edges
    
    # Validate edges have required fields
    for i, edge in enumerate(edges):
        if 'source' not in edge or 'target' not in edge:
            raise HTTPException(
                status_code=400, 
                detail=f"Edge at index {i} missing 'source' or 'target' field"
            )
    
    num_nodes = len(nodes)
    num_edges = len(edges)
    is_dag = check_if_dag(nodes, edges)
    
    return PipelineResponse(
        num_nodes=num_nodes,
        num_edges=num_edges,
        is_dag=is_dag
    )

def check_if_dag(nodes: List[Dict], edges: List[Dict]) -> bool:
    """
    Check if the graph is a Directed Acyclic Graph using DFS.
    
    A DAG is a directed graph with no cycles.
    Uses DFS with recursion stack to detect back edges (cycles).
    """
    # Build node set
    node_ids = {node['id'] for node in nodes}
    
    # Build adjacency list
    graph = {node_id: [] for node_id in node_ids}
    
    for edge in edges:
        source = edge.get('source')
        target = edge.get('target')
        
        # Only add edge if both nodes exist
        if source in graph and target in graph:
            graph[source].append(target)
    
    # Track visited nodes and recursion stack for cycle detection
    # State: 0 = unvisited, 1 = visiting (in stack), 2 = visited
    state = {node_id: 0 for node_id in node_ids}
    
    def has_cycle_iterative(start_node_id: str) -> bool:
        stack = [(start_node_id, iter(graph[start_node_id]))]
        state[start_node_id] = 1
        
        while stack:
            parent, children = stack[-1]
            try:
                child = next(children)
                if state[child] == 1:
                    # Child is in current recursion stack -> cycle
                    return True
                if state[child] == 0:
                    # Child unvisited -> push to stack
                    state[child] = 1
                    stack.append((child, iter(graph[child])))
            except StopIteration:
                # All children processed
                stack.pop()
                state[parent] = 2
        
        return False
    
    # Check each node for cycles
    for node_id in node_ids:
        if state[node_id] == 0:
            if has_cycle_iterative(node_id):
                return False  # Cycle found = NOT a DAG
    
    return True  # No cycles = IS a DAG


if __name__ == '__main__':
    import uvicorn
    uvicorn.run(app, host='0.0.0.0', port=8000)
