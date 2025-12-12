import React, { createContext, useContext, useCallback, useState, useRef } from 'react';
import { addEdge, applyNodeChanges, applyEdgeChanges } from 'reactflow';

const PipelineContext = createContext();

export const PipelineProvider = ({ children }) => {
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const nodeCountRef = useRef({});

  // Generate unique node ID - using ref to avoid stale closure bug
  const getNodeID = useCallback((type) => {
    const count = (nodeCountRef.current[type] || 0) + 1;
    nodeCountRef.current[type] = count;
    return `${type}-${count}`;
  }, []);

  // Add new node
  const addNode = useCallback((node) => {
    setNodes(prev => [...prev, node]);
  }, []);

  // Update nodes based on changes
  const onNodesChange = useCallback((changes) => {
    setNodes(prev => applyNodeChanges(changes, prev));
  }, []);

  // Update edges based on changes
  const onEdgesChange = useCallback((changes) => {
    setEdges(prev => applyEdgeChanges(changes, prev));
  }, []);

  // Connect two nodes
  const onConnect = useCallback((connection) => {
    setEdges(prev => addEdge(
      {
        ...connection,
        type: 'smoothstep',
        animated: true,
        markerEnd: { type: 'arrowclosed' }
      },
      prev
    ));
  }, []);

  // Update node field data
  const updateNodeField = useCallback((nodeId, fieldName, fieldValue) => {
    setNodes(prev => prev.map(node => 
      node.id === nodeId 
        ? { ...node, data: { ...node.data, [fieldName]: fieldValue } }
        : node
    ));
  }, []);

  // Delete node
  const deleteNode = useCallback((nodeId) => {
    setNodes(prev => prev.filter(node => node.id !== nodeId));
    setEdges(prev => prev.filter(edge => 
      edge.source !== nodeId && edge.target !== nodeId
    ));
  }, []);

  // Delete edge
  const deleteEdge = useCallback((edgeId) => {
    setEdges(prev => prev.filter(edge => edge.id !== edgeId));
  }, []);

  const value = {
    nodes,
    edges,
    getNodeID,
    addNode,
    onNodesChange,
    onEdgesChange,
    onConnect,
    updateNodeField,
    deleteNode,
    deleteEdge,
  };

  return (
    <PipelineContext.Provider value={value}>
      {children}
    </PipelineContext.Provider>
  );
};

export const usePipeline = () => {
  const context = useContext(PipelineContext);
  if (!context) {
    throw new Error('usePipeline must be used within PipelineProvider');
  }
  return context;
};
