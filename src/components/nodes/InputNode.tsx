import { memo } from 'react';
import { Handle, Position, NodeProps } from 'reactflow';

interface InputNodeData {
  label: string;
  config: {
    inputType: 'text' | 'file';
    value: string;
  };
}

const InputNode = ({ data, isConnectable }: NodeProps<InputNodeData>) => {
  return (
    <div className="px-4 py-2 shadow-md rounded-md bg-white border-2 border-stone-400">
      <div className="flex items-center">
        <div className="ml-2">
          <div className="text-lg font-bold">{data.label}</div>
          <div className="text-gray-500">
            {data.config.inputType === 'text' ? (
              <textarea
                className="w-full p-2 border rounded"
                placeholder="Enter text..."
                value={data.config.value}
                readOnly
              />
            ) : (
              <div className="flex items-center space-x-2">
                <span className="text-sm">File Input</span>
                {data.config.value && (
                  <span className="text-xs text-gray-400">
                    {data.config.value}
                  </span>
                )}
              </div>
            )}
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

export default memo(InputNode);