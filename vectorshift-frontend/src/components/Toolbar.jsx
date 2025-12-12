import React from 'react';
import { DraggableNode } from './DraggableNode';
import { nodeTypesList } from './nodes/nodeConfigs';
import { NODE_ICONS } from '../utils/constants.jsx';
import { RiDraggable } from "react-icons/ri";

export const Toolbar = () => {
  // Group nodes by functionality for better UX
  const categories = {
    'I/O': ['input', 'output', 'text'],
    'Logic': ['filter', 'splitter', 'aggregator'],
    'Processing': ['llm', 'transformer', 'validator']
  };

  return (
    <div className="w-[280px] bg-white border-r border-gray-200 flex flex-col h-full shadow-lg z-20">
      <div className="p-5 border-b border-gray-100">
        <h2 className="font-bold text-lg text-slate-800 flex items-center gap-2">
          <span className="w-1.5 h-6 bg-blue-600 rounded-full"></span>
          Components
        </h2>
        <p className="text-xs text-slate-500 mt-1 pl-3.5">
          Drag & drop to build flow
        </p>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-6 custom-scrollbar">
        {Object.entries(categories).map(([category, types]) => (
          <div key={category}>
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 px-1">
              {category}
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {nodeTypesList
                .filter(node => types.includes(node.type))
                .map((node) => (
                  <DraggableNode
                    key={node.type}
                    type={node.type}
                    label={node.label}
                    icon={NODE_ICONS[node.type] || <RiDraggable />}
                  />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
