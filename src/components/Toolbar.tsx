import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { setNodes } from '@/store/slices/workflowSlice';
import { Node } from 'reactflow';

const nodeTypes = [
  {
    type: 'input',
    label: 'Input',
    config: {
      inputType: 'text',
      value: '',
    },
  },
  {
    type: 'summarize',
    label: 'Summarize',
    config: {
      temperature: 0.7,
      maxLength: 100,
      model: 'medium',
    },
  },
  {
    type: 'classify',
    label: 'Classify',
    config: {
      categories: ['positive', 'negative', 'neutral'],
      threshold: 0.5,
      multiLabel: false,
    },
  },
  {
    type: 'output',
    label: 'Output',
    config: {
      format: 'text',
    },
  },
];

const Toolbar = () => {
  const dispatch = useDispatch();

  const onDragStart = useCallback(
    (event: React.DragEvent, nodeType: typeof nodeTypes[0]) => {
      event.dataTransfer.setData('application/reactflow', JSON.stringify(nodeType));
      event.dataTransfer.effectAllowed = 'move';
    },
    []
  );

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();

      const reactFlowBounds = document.querySelector('.react-flow-wrapper')?.getBoundingClientRect();
      const type = event.dataTransfer.getData('application/reactflow');
      
      if (!type || !reactFlowBounds) return;

      const position = {
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      };

      const nodeData = JSON.parse(type);
      const newNode: Node = {
        id: `${nodeData.type}-${Date.now()}`,
        type: nodeData.type,
        position,
        data: { label: nodeData.label, config: nodeData.config },
      };

      dispatch(setNodes((nodes: Node[]) => [...nodes, newNode]));
    },
    [dispatch]
  );

  return (
    <div className="p-4 bg-white rounded-lg shadow">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Add Nodes</h3>
      <div className="space-y-2">
        {nodeTypes.map((node) => (
          <div
            key={node.type}
            className="p-2 bg-gray-100 rounded cursor-move hover:bg-gray-200 transition-colors"
            draggable
            onDragStart={(e) => onDragStart(e, node)}
          >
            {node.label}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Toolbar;