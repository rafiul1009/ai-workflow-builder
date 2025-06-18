import { Edge } from 'reactflow';
import { WorkflowNode, NodeResult, NodeType } from '@/types/workflow';

interface WorkflowData {
  nodes: WorkflowNode[];
  edges: Edge[];
}

interface NodeResults {
  [key: string]: NodeResult;
}

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const mockProcessing = async (node: WorkflowNode, input: NodeResult): Promise<NodeResult> => {
  await delay(1000); // Simulate processing time

  switch (node.type as NodeType) {
    case 'input':
      return {
        text: node.data.config.value || 'Sample input text'
      };

    case 'summarize':
      const textToSummarize = input?.text || '';
      return {
        ...input,
        summary: `Summarized (${node.data.config.model}): ${textToSummarize.substring(0, node.data.config.maxLength)}`
      };

    case 'classify':
      const textToClassify = input?.summary || '';
      const category = node.data.config.category || 'positive';
      let confidence: number;
      
      // Simulate different confidence levels based on input and category
      switch (category) {
        case 'positive':
          confidence = textToClassify.toLowerCase().includes('good') ? 0.9 : 0.3;
          break;
        case 'negative':
          confidence = textToClassify.toLowerCase().includes('bad') ? 0.9 : 0.3;
          break;
        case 'neutral':
          confidence = textToClassify.toLowerCase().includes('okay') ? 0.9 : 0.3;
          break;
        default:
          confidence = 0.5;
      }

      return {
        ...input,
        classification: {
          category,
          confidence: confidence.toFixed(2)
        }
      };

    case 'output':
      if (node.data.config.format === 'json') {
        return input;
      }
      
      // Format as text
      const parts = [];
      if (input?.text) parts.push(`Original: ${input.text}`);
      if (input?.summary) parts.push(`Summary: ${input.summary}`);
      if (input?.classification) {
        parts.push(`Classification: ${input.classification.category} (${input.classification.confidence})`);
      }
      return { text: parts.join('<br/>') };

    default:
      return input;
  }
};

const findNextNodes = (nodeId: string, edges: Edge[]): string[] => {
  return edges
    .filter(edge => edge.source === nodeId)
    .map(edge => edge.target);
};

export const executeWorkflow = async (
  workflowData: WorkflowData,
  onNodeComplete: (nodeId: string, result: NodeResult) => void
): Promise<void> => {
  const { nodes, edges } = workflowData;
  const processedNodes = new Set<string>();
  const nodeResults: NodeResults = {};

  const processNode = async (nodeId: string): Promise<void> => {
    if (processedNodes.has(nodeId)) return;

    const node = nodes.find(n => n.id === nodeId);
    if (!node) return;

    // Find input nodes
    const inputEdges = edges.filter(edge => edge.target === nodeId);
    const inputs = await Promise.all(
      inputEdges.map(async edge => {
        if (!processedNodes.has(edge.source)) {
          await processNode(edge.source);
        }
        return nodeResults[edge.source];
      })
    );

    // Process current node
    const input = inputs.length > 0 ? inputs[0] : null;
    const result = await mockProcessing(node, input);
    nodeResults[nodeId] = result;
    processedNodes.add(nodeId);
    onNodeComplete(nodeId, result);

    // Process next nodes
    const nextNodes = findNextNodes(nodeId, edges);
    await Promise.all(nextNodes.map(processNode));
  };

  // Start with input nodes
  const inputNodes = nodes.filter(node => node.type === 'input');  
  await Promise.all(inputNodes.map(node => processNode(node.id)));
};