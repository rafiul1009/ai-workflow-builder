import { memo } from 'react';
import { Handle, Position, NodeProps } from 'reactflow';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';

interface OutputNodeData {
  label: string;
  config: {
    format: 'text' | 'json';
  };
}

const OutputNode = ({ data, id, isConnectable }: NodeProps<OutputNodeData>) => {
  const result = useSelector((state: RootState) => state.workflow.results[id]);

  const renderOutput = (text: string) => {
    return <div dangerouslySetInnerHTML={{ __html: text }} />;
  };

  return (
    <div className="px-3 py-2 shadow-md rounded-md bg-white border-2 border-purple-400">
      <Handle
        type="target"
        position={Position.Top}
        isConnectable={isConnectable}
      />
      <div className="flex items-center">
        <div className="">
          <div className="text-lg font-bold">{data.label}</div>
          <div className="text-sm text-gray-500">
            <div className="flex flex-col gap-1">
              <div>Format: {data.config.format}</div>
              {result && (
                <div className="mt-2 p-2 text-left bg-gray-100 rounded max-w-xs overflow-auto">
                  {data.config.format === 'json' 
                    ? <pre>{JSON.stringify(result, null, 2)}</pre>
                    : renderOutput(result?.text || '')
                  }
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(OutputNode);