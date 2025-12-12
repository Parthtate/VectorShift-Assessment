import React from 'react';
import { BaseNode } from './BaseNode';
import { nodeConfigs } from './nodeConfigs';
import { usePipeline } from '../../context/PipelineContext';

export const OutputNode = ({ data, id }) => {
  const { updateNodeField } = usePipeline();
  const config = nodeConfigs.output;

  return (
    <BaseNode
      data={data}
      nodeType={config.type}
      label={config.label}
      inputHandles={config.inputHandles}
      outputHandles={config.outputHandles}
      fields={config.fields}
      bgColor={config.bgColor}
      borderColor={config.borderColor}
      onFieldChange={updateNodeField}
    />
  );
};
