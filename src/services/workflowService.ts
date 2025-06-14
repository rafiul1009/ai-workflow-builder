import { Node, Edge } from 'reactflow';

interface WorkflowData {
  nodes: Node[];
  edges: Edge[];
}

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const mockProcessing = async (node: Node, input: any): Promise<any> => {
  await delay(1000); // Simulate processing time

  switch (node.type) {
    case 'input':
      return node.data.config.value || 'Sample input text';

    case 'summarize':
      const text = typeof input === 'string' ? input : JSON.stringify(input);
      return `Summarized (${node.data.config.model}): ${text.substring(0, node.data.config.maxLength)}`;

    case 'classify':
      const categories = node.data.config.categories;
      if (node.data.config.multiLabel) {
        return categories
          .filter(() => Math.random() > node.data.config.threshold)
          .map(cat => ({ category: cat, confidence: Math.random().toFixed(2) }));
      }
      const randomCategory = categories[Math.floor(Math.random() * categories.length)];
      return { category: randomCategory, confidence: Math.random().toFixed(2) };

    case 'output':
      return node.data.config.format === 'json' ? JSON.stringify(input, null, 2) : String(input);

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
  onNodeComplete: (nodeId: string, result: any) => void
): Promise<void> => {
  const { nodes, edges } = workflowData;
  const processedNodes = new Set<string>();
  const nodeResults: { [key: string]: any } = {};

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