import { useCallback } from 'react';
import ReactFlow, {
  Background,
  Controls,
  addEdge,
  Connection,
  Edge,
  Node,
  useEdgesState,
  useNodesState,
} from 'reactflow';
import { useDispatch } from 'react-redux';
import { setNodes, setEdges, selectNode } from '@/store/slices/workflowSlice';
import InputNode from './nodes/InputNode';
import SummarizeNode from './nodes/SummarizeNode';
import ClassifyNode from './nodes/ClassifyNode';
import OutputNode from './nodes/OutputNode';

import 'reactflow/dist/style.css';

const nodeTypes = {
  input: InputNode,
  summarize: SummarizeNode,
  classify: ClassifyNode,
  output: OutputNode,
};

const WorkflowCanvas = () => {
  const dispatch = useDispatch();
  const [nodes, setLocalNodes, onNodesChange] = useNodesState([]);
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
      dispatch(selectNode(node));
    },
    [dispatch]
  );

  const onNodesDelete = useCallback(
    (deleted: Node[]) => {
      setLocalNodes(nodes.filter(n => !deleted.find(d => d.id === n.id)));
      dispatch(setNodes(nodes.filter(n => !deleted.find(d => d.id === n.id))));
      dispatch(selectNode(null));
    },
    [nodes, setLocalNodes, dispatch]
  );

  const onEdgesDelete = useCallback(
    (deleted: Edge[]) => {
      setLocalEdges(edges.filter(e => !deleted.find(d => d.id === e.id)));
      dispatch(setEdges(edges.filter(e => !deleted.find(d => d.id === e.id))));
    },
    [edges, setLocalEdges, dispatch]
  );

  return (
    <div className="h-full w-full">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeClick={onNodeClick}
        onNodesDelete={onNodesDelete}
        onEdgesDelete={onEdgesDelete}
        nodeTypes={nodeTypes}
        fitView
      >
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
};

export default WorkflowCanvas;