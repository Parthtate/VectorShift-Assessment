import React, { useRef, useEffect, useState } from 'react';
import { Handle, Position } from 'reactflow';
import { usePipeline } from '../../context/PipelineContext';

export const TextNode = ({ data, id }) => {
  const { updateNodeField } = usePipeline();
  const textareaRef = useRef(null);
  const [variables, setVariables] = useState([]);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      const scrollHeight = textareaRef.current.scrollHeight;
      textareaRef.current.style.height = Math.min(scrollHeight, 300) + 'px';
    }
  }, [data.text]);

  // Extract variables from text
  useEffect(() => {
    if (data.text) {
      const regex = /\{\{(\s*\w+\s*)\}\}/g;
      const matches = [...data.text.matchAll(regex)];
      const vars = matches.map(m => m[1].trim());
      const uniqueVars = [...new Set(vars)];
      setVariables(uniqueVars);
    } else {
      setVariables([]);
    }
  }, [data.text]);

  const handleTextChange = (e) => {
    updateNodeField(id, 'text', e.target.value);
  };

  // Calculate handle positions based on count
  const getHandlePosition = (index, total) => {
    if (total === 1) return '50%';
    const padding = 20;
    const availableSpace = 100 - (padding * 2);
    const spacing = availableSpace / (total - 1);
    return `${padding + (index * spacing)}%`;
  };

  return (
    <div className="relative bg-slate-50 border-2 border-slate-600 rounded-lg shadow-md p-4 min-w-[250px] transition-all duration-200 hover:shadow-lg hover:scale-[1.01]">
      {/* Standard Input Handle (always present) */}
      <Handle
        type="target"
        position={Position.Left}
        id="input"
        style={{
          top: getHandlePosition(0, variables.length + 1),
          background: '#2563eb',
          width: '12px',
          height: '12px',
          border: '2px solid white',
          boxShadow: '0 1px 3px rgba(0,0,0,0.3)',
          zIndex: 10,
        }}
        title="Input"
      />

      {/* Dynamic Variable Handles */}
      {variables.map((variable, idx) => (
        <Handle
          key={`var-${variable}`}
          type="target"
          position={Position.Left}
          id={`var-${variable}`}
          style={{
            top: getHandlePosition(idx + 1, variables.length + 1),
            background: '#2563eb',
            width: '12px',
            height: '12px',
            border: '2px solid white',
            boxShadow: '0 1px 3px rgba(0,0,0,0.3)',
            zIndex: 10,
          }}
          title={variable}
        />
      ))}

      {/* Output Handle */}
      <Handle
        type="source"
        position={Position.Right}
        id="output"
        style={{
          top: '50%',
          background: '#16a34a',
          width: '12px',
          height: '12px',
          border: '2px solid white',
          boxShadow: '0 1px 3px rgba(0,0,0,0.3)',
          zIndex: 10,
        }}
      />

      {/* Node Header */}
      <div className="mb-3 pb-3 border-b border-gray-200">
        <h3 className="font-semibold text-sm text-gray-900">Text</h3>
        <p className="text-xs text-gray-500">text</p>
      </div>

      {/* Textarea with auto-resize */}
      <div className="mb-2">
        <label className="text-xs font-medium text-gray-700 block mb-1">
          Text Content
        </label>
        <textarea
          ref={textareaRef}
          value={data.text || ''}
          onChange={handleTextChange}
          placeholder="Enter text... (supports {{variable}} syntax)"
          className="nodrag w-full px-2 py-2 text-xs border border-gray-300 rounded focus:outline-none focus:border-blue-500 resize-none font-mono"
          style={{
            minHeight: '80px',
            maxHeight: '300px',
            overflow: 'hidden'
          }}
        />
      </div>

      {/* Display detected variables */}
      {variables.length > 0 && (
        <div className="mt-2 p-2 bg-slate-100 rounded text-xs">
          <p className="font-medium text-slate-700 mb-1">Variables:</p>
          <div className="flex flex-wrap gap-1">
            {variables.map(variable => (
              <span key={variable} className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
                {variable}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
