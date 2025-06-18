import { Node, NodeChange } from 'reactflow';

export type NodeType = 'input' | 'summarize' | 'classify' | 'output';

export type Category = 'positive' | 'negative' | 'neutral';

export type NodeConfig = {
  value?: string;
  inputType?: 'text' | 'file';
  model?: 'small' | 'medium' | 'large';
  maxLength?: number;
  temperature?: number;
  category?: Category;
  threshold?: number;
  multiLabel?: boolean;
  format?: 'json' | 'text';
};

export interface WorkflowNode extends Node {
  type: NodeType;
  data: {
    label: string;
    config: NodeConfig;
  };
}

export type ClassificationResult = {
  category: string;
  confidence: string;
};

export type NodeResult = {
  text?: string;
  classification?: ClassificationResult | ClassificationResult[];
  summary?: string;
  value?: string;
} | null;

export type NodePositionChange = NodeChange & {
  type: 'position';
  position: { x: number; y: number };
};

export function isNodePositionChange(change: NodeChange): change is NodePositionChange {
  return change.type === 'position' && 'position' in change;
}
