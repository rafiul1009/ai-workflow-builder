import { useCallback } from 'react';

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
			category: 'positive',
			threshold: 0.5,
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
	const onDragStart = useCallback(
		(event: React.DragEvent, nodeType: typeof nodeTypes[0]) => {
			event.dataTransfer.setData('application/reactflow', JSON.stringify(nodeType));
			event.dataTransfer.effectAllowed = 'move';
		},
		[]
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