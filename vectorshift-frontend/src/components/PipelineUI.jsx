import React, { useCallback, useRef, useState, useMemo } from 'react';
import ReactFlow, { Background, Controls, MiniMap } from 'reactflow';
import 'reactflow/dist/style.css';

import { usePipeline } from '../context/PipelineContext';
import { InputNode } from './nodes/InputNode';
import { OutputNode } from './nodes/OutputNode';
import { TextNode } from './nodes/TextNode';
import { LLMNode } from './nodes/LLMNode';
import { FilterNode } from './nodes/FilterNode';
import { TransformerNode } from './nodes/TransformerNode';
import { ValidatorNode } from './nodes/ValidatorNode';
import { AggregatorNode } from './nodes/AggregatorNode';
import { SplitterNode } from './nodes/SplitterNode';

// Define nodeTypes outside component to prevent recreation warning
const NODE_TYPES = Object.freeze({
  input: InputNode,
  output: OutputNode,
  text: TextNode,
  llm: LLMNode,
  filter: FilterNode,
  transformer: TransformerNode,
  validator: ValidatorNode,
  aggregator: AggregatorNode,
  splitter: SplitterNode,
});

export const PipelineUI = () => {
  const {
    nodes,
    edges,
    getNodeID,
    addNode,
    onNodesChange,
    onEdgesChange,
    onConnect,
  } = usePipeline();

  const reactFlowWrapper = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      let appData;
      try {
        appData = JSON.parse(event.dataTransfer.getData('application/reactflow'));
      } catch (error) {
        console.error('Invalid drag data:', error);
        return;
      }

      if (!appData?.nodeType) return;

      const position = reactFlowInstance.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });

      const nodeID = getNodeID(appData.nodeType);

      const newNode = {
        id: nodeID,
        type: appData.nodeType,
        position,
        data: {
          id: nodeID,
          nodeType: appData.nodeType,
        },
      };

      addNode(newNode);
    },
    [reactFlowInstance, getNodeID, addNode]
  );

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  return (
    <div ref={reactFlowWrapper} className="flex-1 h-screen">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onInit={setReactFlowInstance}
        onDrop={onDrop}
        onDragOver={onDragOver}
        nodeTypes={NODE_TYPES}
        fitView
      >
        <Background color="#aaa" gap={16} />
        <Controls />
        <MiniMap />
      </ReactFlow>
    </div>
  );
};
