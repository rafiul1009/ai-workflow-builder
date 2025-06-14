'use client';

import { Provider } from 'react-redux';
import { ReactFlowProvider } from 'reactflow';
import { store } from '@/store/store';
import WorkflowCanvas from '@/components/WorkflowCanvas';
import Toolbar from '@/components/Toolbar';
import NodeConfig from '@/components/NodeConfig';
import RunWorkflow from '@/components/RunWorkflow';
import SaveWorkflow from '@/components/SaveWorkflow';

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
          <SaveWorkflow />
        </main>
      </ReactFlowProvider>
    </Provider>
          </a>
        </div>
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to nextjs.org →
        </a>
      </footer>
    </div>
  );
}
