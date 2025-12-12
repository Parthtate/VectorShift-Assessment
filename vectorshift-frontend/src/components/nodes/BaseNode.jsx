import React from 'react';
import { Handle, Position } from 'reactflow';

export const BaseNode = ({ 
  data, 
  nodeType,
  label,
  inputHandles = [],
  outputHandles = [],
  fields = [],
  onFieldChange = () => {},
  children,
  bgColor = 'bg-white',
  borderColor = 'border-gray-200'
}) => {
  // Calculate handle positions based on count
  const getHandlePosition = (index, total) => {
    if (total === 1) return '50%';
    // Distribute handles evenly with padding from edges
    const padding = 20; // percentage padding from top/bottom
    const availableSpace = 100 - (padding * 2);
    const spacing = availableSpace / (total - 1);
    return `${padding + (index * spacing)}%`;
  };

  return (
    <div className={`
      relative rounded-lg border-2 ${borderColor} ${bgColor} 
      shadow-md p-4 min-w-[200px] max-w-[300px]
      transition-all duration-200 hover:shadow-lg hover:scale-[1.01]
    `}>
      {/* Input Handles */}
      {inputHandles.map((handle, idx) => (
        <Handle
          key={`input-${handle.id}`}
          type="target"
          position={Position.Left}
          id={handle.id}
          style={{
            top: getHandlePosition(idx, inputHandles.length),
            background: '#2563eb',
            width: '12px',
            height: '12px',
            border: '2px solid white',
            boxShadow: '0 1px 3px rgba(0,0,0,0.3)',
            zIndex: 10,
          }}
          title={handle.label}
        />
      ))}

      {/* Output Handles */}
      {outputHandles.map((handle, idx) => (
        <Handle
          key={`output-${handle.id}`}
          type="source"
          position={Position.Right}
          id={handle.id}
          style={{
            top: getHandlePosition(idx, outputHandles.length),
            background: '#16a34a',
            width: '12px',
            height: '12px',
            border: '2px solid white',
            boxShadow: '0 1px 3px rgba(0,0,0,0.3)',
            zIndex: 10,
          }}
          title={handle.label}
        />
      ))}

      {/* Node Header */}
      <div className="mb-3 pb-3 border-b border-gray-200">
        <h3 className="font-semibold text-sm text-gray-900">{label}</h3>
        <p className="text-xs text-gray-500">{nodeType}</p>
      </div>

      {/* Custom Fields */}
      {fields.map((field) => (
        <div key={field.name} className="mb-2">
          <label className="text-xs font-medium text-gray-700 block mb-1">
            {field.label}
          </label>
          {renderField(field, data[field.name] || '', onFieldChange, data.id)}
        </div>
      ))}

      {/* Custom Children Content */}
      {children}
    </div>
  );
};

// Helper function to render different field types
const renderField = (field, value, onFieldChange, nodeId) => {
  switch (field.type) {
    case 'text':
      return (
        <input
          type="text"
          value={value}
          onChange={(e) => onFieldChange(nodeId, field.name, e.target.value)}
          placeholder={field.placeholder || 'Enter text...'}
          className="nodrag w-full px-2 py-1 text-xs border border-gray-300 rounded focus:outline-none focus:border-blue-500"
        />
      );
    
    case 'textarea':
      return (
        <textarea
          value={value}
          onChange={(e) => onFieldChange(nodeId, field.name, e.target.value)}
          placeholder={field.placeholder || 'Enter text...'}
          rows={field.rows || 3}
          className="nodrag w-full px-2 py-1 text-xs border border-gray-300 rounded focus:outline-none focus:border-blue-500 resize-none"
        />
      );
    
    case 'select':
      return (
        <select
          value={value}
          onChange={(e) => onFieldChange(nodeId, field.name, e.target.value)}
          className="nodrag w-full px-2 py-1 text-xs border border-gray-300 rounded focus:outline-none focus:border-blue-500"
        >
          {field.options?.map(opt => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      );

    case 'number':
      return (
        <input
          type="number"
          value={value}
          onChange={(e) => onFieldChange(nodeId, field.name, e.target.value)}
          placeholder={field.placeholder || '0'}
          className="nodrag w-full px-2 py-1 text-xs border border-gray-300 rounded focus:outline-none focus:border-blue-500"
        />
      );

    default:
      return null;
  }
};
