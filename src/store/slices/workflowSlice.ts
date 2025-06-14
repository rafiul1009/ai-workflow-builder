import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Edge, Node } from 'reactflow';

interface NodeConfig {
  id: string;
  type: 'input' | 'summarize' | 'classify' | 'output';
  data: {
    label: string;
    config: {
      [key: string]: any;
    };
  };
}

interface WorkflowState {
  nodes: Node[];
  edges: Edge[];
  selectedNode: NodeConfig | null;
  isRunning: boolean;
  results: {
    [nodeId: string]: any;
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
    setNodes: (state, action: PayloadAction<Node[]>) => {
      state.nodes = action.payload;
    },
    setEdges: (state, action: PayloadAction<Edge[]>) => {
      state.edges = action.payload;
    },
    selectNode: (state, action: PayloadAction<NodeConfig | null>) => {
      state.selectedNode = action.payload;
    },
    updateNodeConfig: (state, action: PayloadAction<{ id: string; config: any }>) => {
      const node = state.nodes.find(n => n.id === action.payload.id);
      if (node) {
        node.data.config = { ...node.data.config, ...action.payload.config };
      }
    },
    setRunningState: (state, action: PayloadAction<boolean>) => {
      state.isRunning = action.payload;
    },
    setNodeResult: (state, action: PayloadAction<{ nodeId: string; result: any }>) => {
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