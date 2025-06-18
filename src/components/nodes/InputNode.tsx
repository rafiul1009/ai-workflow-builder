import { memo, useCallback } from 'react';
import { Handle, Position, NodeProps } from 'reactflow';
import { useDispatch } from 'react-redux';
import { updateNodeConfig } from '@/store/slices/workflowSlice';

interface InputNodeData {
  label: string;
  config: {
    inputType: 'text' | 'file';
    value: string;
  };
}

const InputNode = ({ data, id, isConnectable }: NodeProps<InputNodeData>) => {
  
  const dispatch = useDispatch();

  const handleTextChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      dispatch(
        updateNodeConfig({
          id,
          config: { value: e.target.value },
        })
      );
    },
    [dispatch, id]
  );

  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        dispatch(
          updateNodeConfig({
            id,
            config: { value: file.name },
          })
        );
      }
    },
    [dispatch, id]
  );

  return (
    <div className="px-4 py-2 shadow-md rounded-md bg-white border-2 border-stone-400">
      <div className="flex items-center">
        <div className="ml-2 w-full">
          <div className="text-lg font-bold">{data.label}</div>
          <div className="text-gray-500">
            {data.config.inputType === 'text' ? (
              <textarea
                className="w-full p-2 border rounded resize-y min-h-[60px]"
                placeholder="Enter text..."
                value={data.config.value}
                onChange={handleTextChange}
              />
            ) : (
              <div className="flex flex-col gap-2">
                <input
                  type="file"
                  id={`file-${id}`}
                  className="hidden"
                  onChange={handleFileChange}
                />
                <label
                  htmlFor={`file-${id}`}
                  className="cursor-pointer px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded text-center"
                >
                  {data.config.value ? 'Change File' : 'Upload File'}
                </label>
                {data.config.value && (
                  <span className="text-sm text-gray-600 truncate">
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