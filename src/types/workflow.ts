import { Node } from 'reactflow';

export type NodeType = 'input' | 'summarize' | 'classify' | 'output';

export type NodeConfig = {
  value?: string;
  inputType?: 'text' | 'file';
  model?: 'small' | 'medium' | 'large';
  maxLength?: number;
  temperature?: number;
  categories?: string[];
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
