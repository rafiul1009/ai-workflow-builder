import { memo } from 'react';
import { Handle, Position, NodeProps } from 'reactflow';

interface ClassifyNodeData {
  label: string;
  config: {
    categories: string[];
    threshold: number;
    multiLabel: boolean;
  };
}

const ClassifyNode = ({ data, isConnectable }: NodeProps<ClassifyNodeData>) => {
  return (
    <div className="px-4 py-2 shadow-md rounded-md bg-white border-2 border-green-400">
      <Handle
        type="target"
        position={Position.Top}
        isConnectable={isConnectable}
      />
      <div className="flex items-center">
        <div className="ml-2">
          <div className="text-lg font-bold">{data.label}</div>
          <div className="text-sm text-gray-500">
            <div className="flex flex-col gap-1">
              <div>
                Categories: {data.config.categories.join(', ')}
              </div>
              <div>
                Threshold: {data.config.threshold}
              </div>
              <div>
                Multi-label: {data.config.multiLabel ? 'Yes' : 'No'}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Handle
        type="source"
        position={Position.Bottom}
        isConnectable={isConnectable}
      />
    </div>
  );
};

export default memo(ClassifyNode);