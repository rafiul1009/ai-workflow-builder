import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store/store';
import { updateNodeConfig } from '@/store/slices/workflowSlice';
import { Category, NodeConfig as NodeConfigType } from '@/types/workflow';

type ConfigChanges = Partial<NodeConfigType>;

const NodeConfig = () => {
  const dispatch = useDispatch();
  const selectedNode = useSelector((state: RootState) => state.workflow.selectedNode);

  if (!selectedNode) {
    return (
      <div className="p-4 bg-white rounded-lg shadow">
        <p className="text-gray-500">Select a node to configure</p>
      </div>
    );
  }

  const handleConfigChange = (changes: ConfigChanges) => {    
    dispatch(updateNodeConfig({
      id: selectedNode.id,
      config: changes
    }));
  };

  const renderInputConfig = () => (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Input Type</label>
        <select
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          value={selectedNode.data.config.inputType}
          onChange={(e) => handleConfigChange({ inputType: e.target.value as 'text' | 'file' })}
        >
          <option value="text">Text</option>
          <option value="file">File</option>
        </select>
      </div>
    </div>
  );

  const renderSummarizeConfig = () => (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Model Size</label>
        <select
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          value={selectedNode.data.config.model}
          onChange={(e) => handleConfigChange({ model: e.target.value as 'small' | 'medium' | 'large' })}
        >
          <option value="small">Small</option>
          <option value="medium">Medium</option>
          <option value="large">Large</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Temperature</label>
        <input
          type="range"
          min="0"
          max="1"
          step="0.1"
          value={selectedNode.data.config.temperature}
          onChange={(e) => handleConfigChange({ temperature: parseFloat(e.target.value) })}
          className="w-full"
        />
        <span className="text-sm text-gray-500">{selectedNode.data.config.temperature}</span>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Max Length</label>
        <input
          type="number"
          value={selectedNode.data.config.maxLength}
          onChange={(e) => handleConfigChange({ maxLength: parseInt(e.target.value) })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>
    </div>
  );

  const renderClassifyConfig = () => (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Category</label>
        <select
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          value={selectedNode.data.config.category || 'positive'}
          onChange={(e) => handleConfigChange({ category: e.target.value as Category })}
        >
          <option value="positive">Positive</option>
          <option value="negative">Negative</option>
          <option value="neutral">Neutral</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Threshold</label>
        <input
          type="range"
          min="0"
          max="1"
          step="0.1"
          value={selectedNode.data.config.threshold}
          onChange={(e) => handleConfigChange({ threshold: parseFloat(e.target.value) })}
          className="w-full"
        />
        <span className="text-sm text-gray-500">{selectedNode.data.config.threshold}</span>
      </div>
    </div>
  );

  const renderOutputConfig = () => (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Output Format</label>
        <select
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          value={selectedNode.data.config.format}
          onChange={(e) => handleConfigChange({ format: e.target.value as 'text' | 'json' })}
        >
          <option value="text">Text</option>
          <option value="json">JSON</option>
        </select>
      </div>
    </div>
  );

  const configComponents = {
    input: renderInputConfig,
    summarize: renderSummarizeConfig,
    classify: renderClassifyConfig,
    output: renderOutputConfig,
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow">
      <h3 className="text-lg font-medium text-gray-900 mb-4">
        Configure {selectedNode.data.label}
      </h3>
      {configComponents[selectedNode.type]()}
    </div>
  );
};

export default NodeConfig;