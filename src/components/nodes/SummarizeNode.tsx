import { memo } from 'react';
import { Handle, Position, NodeProps } from 'reactflow';

interface SummarizeNodeData {
  label: string;
  config: {
    temperature: number;
    maxLength: number;
    model: 'small' | 'medium' | 'large';
  };
}

const SummarizeNode = ({ data, isConnectable }: NodeProps<SummarizeNodeData>) => {
  return (
    <div className="px-4 py-2 shadow-md rounded-md bg-white border-2 border-blue-400">
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
                Model: {data.config.model}
              </div>
              <div>
                Temp: {data.config.temperature}
              </div>
              <div>
                Max Length: {data.config.maxLength}
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

export default memo(SummarizeNode);