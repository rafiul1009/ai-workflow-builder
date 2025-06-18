import { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store/store';
import { setRunningState, setNodeResult, clearResults } from '@/store/slices/workflowSlice';
import { executeWorkflow } from '@/services/workflowService';
import { NodeResult } from '@/types/workflow';

const RunWorkflow = () => {
  const dispatch = useDispatch();
  const { nodes, edges, isRunning } = useSelector((state: RootState) => state.workflow);

  const handleRunWorkflow = useCallback(async () => {
    dispatch(setRunningState(true));
    dispatch(clearResults());

    try {
      await executeWorkflow(
        { nodes, edges },
        (nodeId: string, result: NodeResult) => {
          dispatch(setNodeResult({ nodeId, result }));
        }
      );
    } catch (error) {
      console.error('Workflow execution failed:', error);
    } finally {
      dispatch(setRunningState(false));
    }
  }, [dispatch, nodes, edges]);

  return (
    <div className="fixed bottom-4 right-4 z-10">
      <button
        onClick={handleRunWorkflow}
        disabled={isRunning || nodes.length === 0}
        className={`
          px-6 py-2 rounded-lg shadow-lg font-medium
          ${isRunning
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-blue-500 hover:bg-blue-600 text-white transition-colors'
          }
        `}
      >
        {isRunning ? (
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            Running...
          </div>
        ) : (
          'Run Workflow'
        )}
      </button>
    </div>
  );
};

export default RunWorkflow;