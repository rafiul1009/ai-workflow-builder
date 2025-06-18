import { useCallback } from 'react';
import ReactFlow, {
  Background,
  Controls,
  addEdge,
  Connection,
  Edge,
  Node,
  NodeChange,
  useEdgesState,
} from 'reactflow';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { setNodes, setEdges, selectNode } from '@/store/slices/workflowSlice';
import { WorkflowNode } from '@/types/workflow';
import InputNode from './nodes/InputNode';
import SummarizeNode from './nodes/SummarizeNode';
import ClassifyNode from './nodes/ClassifyNode';
import OutputNode from './nodes/OutputNode';
import { isNodePositionChange } from '@/types/workflow';

import 'reactflow/dist/style.css';

const nodeTypes = {
  input: InputNode,
  summarize: SummarizeNode,
  classify: ClassifyNode,
  output: OutputNode,
};

const WorkflowCanvas = () => {
  const dispatch = useDispatch();
  const nodes = useSelector((state: RootState) => state.workflow.nodes);
  const [edges, setLocalEdges, onEdgesChange] = useEdgesState([]);

  const onConnect = useCallback(
    (params: Connection | Edge) => {
      const newEdges = addEdge(params, edges);
      setLocalEdges(newEdges);
      dispatch(setEdges(newEdges));
    },
    [edges, setLocalEdges, dispatch]
  );

  const onNodeClick = useCallback(
    (_: React.MouseEvent, node: Node) => {
      if (!node.type) return;
      dispatch(selectNode({
        ...node,  // Include all node properties (position, etc.)
        type: node.type as 'input' | 'summarize' | 'classify' | 'output',
        data: {
          label: node.data.label,
          config: node.data.config
        }
      }));
    },
    [dispatch]
  );

  const onNodesDelete = useCallback(
    (deleted: Node[]) => {
      const filteredNodes = nodes.filter(
        n => !deleted.find(d => d.id === n.id)
      );
      dispatch(setNodes(filteredNodes));
      dispatch(selectNode(null));
    },
    [nodes, dispatch]
  );

  const onEdgesDelete = useCallback(
    (deleted: Edge[]) => {
      setLocalEdges(edges.filter(e => !deleted.find(d => d.id === e.id)));
      dispatch(setEdges(edges.filter(e => !deleted.find(d => d.id === e.id))));
    },
    [edges, setLocalEdges, dispatch]
  );

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();

      const reactFlowBounds = event.currentTarget.getBoundingClientRect();
      const type = event.dataTransfer.getData('application/reactflow');

      if (!type) return;

      const position = {
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      };

      const nodeData = JSON.parse(type);
      const newNode: WorkflowNode = {
        id: `${nodeData.type}-${Date.now()}`,
        type: nodeData.type,
        position,
        data: { label: nodeData.label, config: nodeData.config },
      };

      dispatch(setNodes([...nodes, newNode]));
    },
    [dispatch, nodes]
  );

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  // Add handler for node changes
  const handleNodesChange = useCallback((changes: NodeChange[]) => {
    changes.forEach((change) => {
      if (isNodePositionChange(change)) {
        const updatedNodes = nodes.map(node =>
          node.id === change.id
            ? { ...node, position: change.position }
            : node
        );
        dispatch(setNodes(updatedNodes));
      }
    });
  }, [nodes, dispatch]);

  return (
    <div className="h-full w-full">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={handleNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeClick={onNodeClick}
        onNodesDelete={onNodesDelete}
        onEdgesDelete={onEdgesDelete}
        nodeTypes={nodeTypes}
        onDrop={onDrop}
        onDragOver={onDragOver}
        fitView
      >
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
};

export default WorkflowCanvas;