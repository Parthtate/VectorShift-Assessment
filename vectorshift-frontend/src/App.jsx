import React from 'react';
import { PipelineProvider } from './context/PipelineContext';
import { Toolbar } from './components/Toolbar';
import { PipelineUI } from './components/PipelineUI';
import { SubmitButton } from './components/SubmitButton';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <PipelineProvider>
      <div className="flex h-screen bg-gray-50">
        {/* Sidebar Toolbar */}
        <Toolbar />

        {/* Main Canvas */}
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <div className="bg-slate-900 border-b border-slate-800 p-4 shadow-xl flex justify-between items-center z-10 sticky top-0">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center shadow-lg shadow-blue-500/20 font-bold text-white text-xl">
                V
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">
                  VectorShift Pipeline Builder
                </h1>
                <p className="text-slate-400 text-xs font-medium tracking-wide">
                  Design & Deploy AI Workflows
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <SubmitButton />
            </div>
          </div>

          {/* Canvas Area */}
          <PipelineUI />
        </div>

        {/* Toast Notifications */}
        <ToastContainer
          position="bottom-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </div>
    </PipelineProvider>
  );
}

export default App;
