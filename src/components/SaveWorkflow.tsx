import { useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Edge } from 'reactflow';
import { RootState } from '@/store/store';
import { setNodes, setEdges } from '@/store/slices/workflowSlice';
import { WorkflowNode } from '@/types/workflow';

interface Workflow {
  _id: string;
  name: string;
  nodes: WorkflowNode[];
  edges: Edge[];
}

const SaveWorkflow = () => {
  const dispatch = useDispatch();
  const { nodes, edges } = useSelector((state: RootState) => state.workflow);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [workflowName, setWorkflowName] = useState('');
  const [savedWorkflows, setSavedWorkflows] = useState<Workflow[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchWorkflows = useCallback(async () => {
    try {
      const response = await fetch('/api/workflows');
      const data = await response.json();
      setSavedWorkflows(data);
    } catch (error) {
      console.error('Failed to fetch workflows:', error);
    }
  }, []);

  const handleSave = async () => {
    if (!workflowName.trim()) return;

    setIsLoading(true);
    try {
      const response = await fetch('/api/workflows', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: workflowName,
          nodes,
          edges,
        }),
      });

      if (!response.ok) throw new Error('Failed to save workflow');

      setWorkflowName('');
      setIsModalOpen(false);
      await fetchWorkflows();
    } catch (error) {
      console.error('Error saving workflow:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoad = async (workflow: Workflow) => {
    try {
      dispatch(setNodes(workflow.nodes));
      dispatch(setEdges(workflow.edges));
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error loading workflow:', error);
    }
  };

  return (
    <>
      <div className="fixed bottom-4 left-4 z-10 space-x-2">
        <button
          onClick={() => {
            setIsModalOpen(true);
            fetchWorkflows();
          }}
          className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
        >
          Save/Load Workflow
        </button>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-96">
            <h2 className="text-xl font-bold mb-4">Save/Load Workflow</h2>

            <div className="mb-4">
              <input
                type="text"
                placeholder="Enter workflow name"
                value={workflowName}
                onChange={(e) => setWorkflowName(e.target.value)}
                className="w-full px-3 py-2 border rounded"
              />
              <button
                onClick={() => handleSave()}
                disabled={isLoading || !workflowName.trim()}
                className="mt-2 w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-400"
              >
                {isLoading ? 'Saving...' : 'Save Current Workflow'}
              </button>
            </div>

            <div className="max-h-60 overflow-y-auto">
              <h3 className="font-medium mb-2">Saved Workflows</h3>
              {savedWorkflows.map((workflow) => (
                <div
                  key={workflow._id}
                  className="flex items-center justify-between p-2 hover:bg-gray-100 rounded"
                >
                  <span>{workflow.name}</span>
                  <button
                    onClick={() => handleLoad(workflow)}
                    className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
                  >
                    Load
                  </button>
                </div>
              ))}
            </div>

            <button
              onClick={() => setIsModalOpen(false)}
              className="mt-4 w-full px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default SaveWorkflow;