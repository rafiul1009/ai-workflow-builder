import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Edge } from 'reactflow';
import { WorkflowNode, NodeConfig, NodeResult } from '@/types/workflow';

interface WorkflowState {
  nodes: WorkflowNode[];
  edges: Edge[];
  selectedNode: WorkflowNode | null;
  isRunning: boolean;
  results: {
    [nodeId: string]: NodeResult;
  };
}

const initialState: WorkflowState = {
  nodes: [],
  edges: [],
  selectedNode: null,
  isRunning: false,
  results: {},
};

export const workflowSlice = createSlice({
  name: 'workflow',
  initialState,
  reducers: {
    setNodes: (state, action: PayloadAction<WorkflowNode[]>) => {
      state.nodes = action.payload;
    },
    setEdges: (state, action: PayloadAction<Edge[]>) => {
      state.edges = action.payload;
    },
    selectNode: (state, action: PayloadAction<WorkflowNode | null>) => {
      state.selectedNode = action.payload;
    },
    updateNodeConfig: (state, action: PayloadAction<{ id: string; config: Partial<NodeConfig> }>) => {
      const node = state.nodes.find(n => n.id === action.payload.id);
      if (node) {
        node.data.config = { ...node.data.config, ...action.payload.config };
      }
    },
    setRunningState: (state, action: PayloadAction<boolean>) => {
      state.isRunning = action.payload;
    },
    setNodeResult: (state, action: PayloadAction<{ nodeId: string; result: NodeResult }>) => {
      state.results[action.payload.nodeId] = action.payload.result;
    },
    clearResults: (state) => {
      state.results = {};
    },
  },
});

export const {
  setNodes,
  setEdges,
  selectNode,
  updateNodeConfig,
  setRunningState,
  setNodeResult,
  clearResults,
} = workflowSlice.actions;

export default workflowSlice.reducer;