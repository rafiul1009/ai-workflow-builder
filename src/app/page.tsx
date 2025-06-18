'use client';

import { Provider } from 'react-redux';
import { ReactFlowProvider } from 'reactflow';
import { store } from '@/store/store';
import WorkflowCanvas from '@/components/WorkflowCanvas';
import Toolbar from '@/components/Toolbar';
import NodeConfig from '@/components/NodeConfig';
import RunWorkflow from '@/components/RunWorkflow';
// import SaveWorkflow from '@/components/SaveWorkflow';

export default function Home() {
  return (
    <Provider store={store}>
      <ReactFlowProvider>
        <main className="flex h-screen">
          <div className="w-64 p-4 border-r border-gray-200">
            <Toolbar />
          </div>
          <div className="flex-1 relative">
            <WorkflowCanvas />
          </div>
          <div className="w-80 p-4 border-l border-gray-200">
            <NodeConfig />
          </div>
          <RunWorkflow />
          {/* <SaveWorkflow /> */}
        </main>
      </ReactFlowProvider>
    </Provider>
  );
}
