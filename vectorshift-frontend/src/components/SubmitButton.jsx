import React, { useState } from 'react';
import { usePipeline } from '../context/PipelineContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { API_BASE_URL, API_ENDPOINTS, ERROR_MESSAGES } from '../utils/constants.jsx';

export const SubmitButton = () => {
  const { nodes, edges } = usePipeline();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (nodes.length === 0) {
      toast.warning(ERROR_MESSAGES.EMPTY_PIPELINE);
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(`${API_BASE_URL}${API_ENDPOINTS.PARSE_PIPELINE}`, {
        nodes,
        edges,
      });

      const { num_nodes, num_edges, is_dag } = response.data;

      const message = `Pipeline Analysis Complete!

Nodes: ${num_nodes}
Edges: ${num_edges}
Is DAG: ${is_dag ? 'Yes ✓' : 'No ✗ (Contains cycles)'}
      `;

      toast.success(message);
      
      // Also show alert for emphasis
      alert(message);
    } catch (error) {
      console.error('Error:', error);
      toast.error(ERROR_MESSAGES.NETWORK_ERROR);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleSubmit}
      disabled={loading}
      className={`
        px-6 py-3 rounded-lg font-semibold text-white transition-all duration-200 shadow-md
        ${loading 
          ? 'bg-gray-400 cursor-not-allowed' 
          : 'bg-blue-600 hover:bg-blue-700 hover:shadow-lg active:scale-95'
        }
      `}
    >
      {loading ? 'Submitting...' : 'Submit Pipeline'}
    </button>
  );
};
