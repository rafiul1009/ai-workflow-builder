# AI Workflow Builder

A drag-and-drop visual AI workflow builder for non-technical users to design, simulate, and persist customizable automation pipelines.

## Features

- 🎨 Interactive Canvas with React Flow
  - Add and move nodes (Input, Process, Output types)
  - Connect nodes using edges
  - Zoom, pan, and reset view
  - Delete or duplicate nodes and edges

- 🧩 Node Types & Configuration
  - InputNode: Accept text or file input
  - SummarizeNode: AI summarization config
  - ClassifyNode: Select label category
  - OutputNode: Display results
  - Sidebar editor for node configuration

- ⚡ Workflow Execution
  - Mock execution of workflows
  - Data passing between nodes
  - Loading indicators and results display

- 💾 Save & Load
  - MongoDB integration for workflow persistence
  - Load and edit saved workflows

## Tech Stack

- Frontend: Next.js, TypeScript, TailwindCSS
- Canvas: React Flow
- State Management: Redux Toolkit
- Database: MongoDB (Mongoose)
- Testing: Jest

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/yourusername/ai-workflow-builder.git
cd ai-workflow-builder
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp env.local.example .env.local
```
Edit `.env.local` and add your MongoDB connection string.

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

1. **Adding Nodes**:
   - Drag nodes from the left toolbar onto the canvas
   - Available nodes: Input, Summarize, Classify, Output

2. **Configuring Nodes**:
   - Click a node to open its configuration in the right sidebar
   - Adjust parameters like input type, model settings, etc.

3. **Connecting Nodes**:
   - Click and drag from a node's output handle to another node's input handle
   - Create a flow from input through processing to output

4. **Running Workflows**:
   - Click the "Run Workflow" button to execute the flow
   - Watch as data moves through the nodes
   - View results in Output nodes

5. **Saving/Loading**:
   - Use the "Save/Load Workflow" button to persist your workflows
   - Give your workflow a name and save it
   - Load previously saved workflows

## Testing

Run the test suite:
```bash
npm test
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
