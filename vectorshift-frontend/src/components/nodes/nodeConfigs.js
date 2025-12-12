// Configuration for all node types - Clean Minimal Design System
export const nodeConfigs = {
  input: {
    type: 'input',
    label: 'Input',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-600',
    inputHandles: [],
    outputHandles: [{ id: 'output', label: 'Output' }],
    fields: [
      { name: 'label', label: 'Label', type: 'text', placeholder: 'Input Name' }
    ]
  },
  
  output: {
    type: 'output',
    label: 'Output',
    bgColor: 'bg-green-50',
    borderColor: 'border-green-600',
    inputHandles: [{ id: 'input', label: 'Input' }],
    outputHandles: [],
    fields: [
      { name: 'label', label: 'Label', type: 'text', placeholder: 'Output Name' }
    ]
  },

  text: {
    type: 'text',
    label: 'Text',
    bgColor: 'bg-slate-50',
    borderColor: 'border-slate-600',
    supportsVariables: true,
    inputHandles: [{ id: 'input', label: 'Input' }],
    outputHandles: [{ id: 'output', label: 'Output' }],
    fields: [
      { 
        name: 'text', 
        label: 'Text Content', 
        type: 'textarea', 
        rows: 4,
        placeholder: 'Enter text... (supports {{variable}} syntax)' 
      }
    ],
  },

  llm: {
    type: 'llm',
    label: 'LLM',
    bgColor: 'bg-amber-50',
    borderColor: 'border-amber-600',
    inputHandles: [{ id: 'prompt', label: 'Prompt' }],
    outputHandles: [{ id: 'response', label: 'Response' }],
    fields: [
      { name: 'model', label: 'Model', type: 'select', options: [
        { value: 'gpt-3.5', label: 'GPT-3.5' },
        { value: 'gpt-4', label: 'GPT-4' },
        { value: 'claude', label: 'Claude' }
      ]},
      { name: 'temperature', label: 'Temperature', type: 'number' }
    ]
  },

  // NEW NODES (Part 1 Requirement)
  filter: {
    type: 'filter',
    label: 'Filter',
    bgColor: 'bg-cyan-50',
    borderColor: 'border-cyan-600',
    inputHandles: [{ id: 'input', label: 'Input' }],
    outputHandles: [
      { id: 'pass', label: 'Pass' },
      { id: 'reject', label: 'Reject' }
    ],
    fields: [
      { name: 'condition', label: 'Condition', type: 'textarea', rows: 2, placeholder: 'e.g., age > 18' }
    ]
  },

  transformer: {
    type: 'transformer',
    label: 'Transformer',
    bgColor: 'bg-purple-50',
    borderColor: 'border-purple-600',
    inputHandles: [{ id: 'input', label: 'Input' }],
    outputHandles: [{ id: 'output', label: 'Output' }],
    fields: [
      { name: 'operation', label: 'Operation', type: 'select', options: [
        { value: 'uppercase', label: 'Uppercase' },
        { value: 'lowercase', label: 'Lowercase' },
        { value: 'reverse', label: 'Reverse' }
      ]}
    ]
  },

  validator: {
    type: 'validator',
    label: 'Validator',
    bgColor: 'bg-red-50',
    borderColor: 'border-red-600',
    inputHandles: [{ id: 'input', label: 'Input' }],
    outputHandles: [
      { id: 'valid', label: 'Valid' },
      { id: 'invalid', label: 'Invalid' }
    ],
    fields: [
      { name: 'rule', label: 'Validation Rule', type: 'textarea', rows: 2, placeholder: 'e.g., email format' }
    ]
  },

  aggregator: {
    type: 'aggregator',
    label: 'Aggregator',
    bgColor: 'bg-indigo-50',
    borderColor: 'border-indigo-600',
    inputHandles: [
      { id: 'input1', label: 'Input 1' },
      { id: 'input2', label: 'Input 2' },
      { id: 'input3', label: 'Input 3' }
    ],
    outputHandles: [{ id: 'output', label: 'Output' }],
    fields: [
      { name: 'method', label: 'Aggregation Method', type: 'select', options: [
        { value: 'merge', label: 'Merge' },
        { value: 'concat', label: 'Concatenate' },
        { value: 'combine', label: 'Combine' }
      ]}
    ]
  },

  splitter: {
    type: 'splitter',
    label: 'Splitter',
    bgColor: 'bg-teal-50',
    borderColor: 'border-teal-600',
    inputHandles: [{ id: 'input', label: 'Input' }],
    outputHandles: [
      { id: 'output1', label: 'Output 1' },
      { id: 'output2', label: 'Output 2' }
    ],
    fields: [
      { name: 'delimiter', label: 'Delimiter', type: 'text', placeholder: ',' }
    ]
  }
};

export const nodeTypesList = Object.keys(nodeConfigs).map(key => ({
  type: key,
  ...nodeConfigs[key]
}));
