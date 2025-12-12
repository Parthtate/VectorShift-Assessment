# VectorShift Pipeline Builder

## Overview

VectorShift Pipeline Builder is an interactive web application that enables users to create complex AI pipelines visually without writing code. Users can drag nodes from a categorized sidebar onto a canvas, connect them to define data flow, and validate the pipeline structure in real-time.

## Features

### Visual Canvas
- **Drag-and-Drop Interface** - Intuitive node-based workflow design powered by ReactFlow
- **Real-time Connections** - Animated edges with visual feedback
- **Interactive Grid Layout** - Organized node categories for better usability
- **Responsive Design** - Modern, clean UI with dark mode header

### Node Types (9 Total)

The application includes 9 configurable node types organized into 3 categories:

#### I/O Nodes
- **Input** - Data entry points for pipelines
- **Output** - Final result destinations
- **Text** - Text processing with dynamic variable support (`{{variable}}` syntax)

#### Logic Nodes
- **Filter** - Conditional routing with Pass/Reject outputs
- **Splitter** - Split data streams into multiple outputs
- **Aggregator** - Combine multiple input streams

#### Processing Nodes
- **LLM** - AI language model integration (GPT-3.5, GPT-4, Claude)
- **Transformer** - Data transformations (uppercase, lowercase, reverse)
- **Validator** - Data validation with valid/invalid routing

### Pipeline Validation

When you submit a pipeline, the backend performs comprehensive analysis:
- **Node Count** - Total number of nodes in the workflow
- **Edge Count** - Number of connections between nodes
- **DAG Validation** - Detects cycles using iterative Depth-First Search (DFS)
- **User-Friendly Alerts** - Toast notifications and alerts with validation results

### Advanced Features

- **Dynamic Variable Extraction** - Text nodes automatically detect `{{variable}}` syntax and create input handles
- **Auto-Resizing Text Areas** - Text nodes expand based on content
- **Config-Driven Architecture** - Easy to add new node types via `nodeConfigs.js`
- **BaseNode Abstraction** - Reusable component pattern for consistent node behavior

---

## Tech Stack

### Frontend
| Technology | Version | Purpose |
|------------|---------|---------|
| React | 19.2.0 | UI framework with modern features |
| Vite | 7.2.4 | Fast build tool and dev server |
| TailwindCSS | 4.1.18 | Utility-first CSS framework |
| ReactFlow | 11.11.4 | Node-based UI canvas |
| Axios | 1.13.2 | HTTP client for API calls |
| React Icons | 5.5.0 | Icon library |
| React Toastify | 11.0.5 | Toast notifications |

### Backend
| Technology | Version | Purpose |
|------------|---------|---------|
| FastAPI | Latest | Python web framework |
| Uvicorn | Latest | ASGI server |
| Pydantic | Latest | Data validation |

---

## Installation

### Prerequisites
- **Node.js** (v18 or higher)
- **Python** (3.8 or higher)
- **npm** or **yarn**

### Clone the Repository
```bash
git clone https://github.com/Parthtate/VectorShift-assessment.git
cd VectorShift-assessment
```

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd vectorshift-frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The frontend will run at **http://localhost:3000** or **http://localhost:5173** (Vite default).

### Backend Setup

1. Navigate to the backend directory:
```bash
cd vectorshift-backend
```

2. Create a virtual environment (recommended):
```bash
python -m venv venv
source venv/Scripts/activate  # Windows
# source venv/bin/activate    # macOS/Linux
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

4. Start the FastAPI server:
```bash
uvicorn main:app --reload
```

The backend will run at **http://localhost:8000**.

---

## Usage

### Creating a Pipeline

1. **Drag Nodes** - Select a node from the categorized sidebar and drag it onto the canvas
2. **Connect Nodes** - Click and drag from an output handle (right side) to an input handle (left side)
3. **Configure Nodes** - Click on nodes to edit their properties (model selection, conditions, etc.)
4. **Submit Pipeline** - Click the "Submit Pipeline" button in the header
5. **View Results** - See validation results in toast notifications and alerts

### Example: Valid DAG Pipeline
```
Input → Text → LLM → Output
```

### Example: Invalid Pipeline (Contains Cycle)
```
LLM → Transformer → Filter
 ↑                     ↓
 └─────────────────────┘
```

### Testing Variable Extraction

1. Drag a **Text** node onto the canvas
2. Type in the text area: `Hello {{name}}, your order {{orderId}} is ready!`
3. Notice two input handles appear automatically: `name` and `orderId`
4. Connect other nodes to these variable handles

---

## Architecture

### Project Structure

```
vectorshift-assessment/
├── vectorshift-frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── nodes/
│   │   │   │   ├── BaseNode.jsx          # Reusable node abstraction
│   │   │   │   ├── nodeConfigs.js        # Node type definitions
│   │   │   │   ├── TextNode.jsx          # Special text node with variables
│   │   │   │   └── [Other nodes...]
│   │   │   ├── PipelineUI.jsx            # ReactFlow canvas wrapper
│   │   │   ├── Toolbar.jsx               # Sidebar with draggable nodes
│   │   │   ├── DraggableNode.jsx         # Draggable node component
│   │   │   └── SubmitButton.jsx          # Pipeline submission
│   │   ├── context/
│   │   │   └── PipelineContext.jsx       # Global state management
│   │   ├── utils/
│   │   │   └── constants.jsx             # API URLs, icons, messages
│   │   ├── App.jsx                       # Main application
│   │   └── main.jsx                      # Entry point
│   └── package.json
│
├── vectorshift-backend/
│   ├── main.py                           # FastAPI application
│   └── requirements.txt                  # Python dependencies
│
└── README.md
```

### Key Design Patterns

#### 1. BaseNode Abstraction
All nodes inherit from `BaseNode.jsx`, which provides:
- Dynamic handle positioning
- Configurable field types (text, textarea, select, number)
- Consistent styling and interactions

```javascript
<BaseNode
  nodeType="llm"
  label="LLM"
  inputHandles={[{ id: 'prompt', label: 'Prompt' }]}
  outputHandles={[{ id: 'response', label: 'Response' }]}
  fields={[{ name: 'model', type: 'select', options: [...] }]}
/>
```

#### 2. Configuration-Driven Nodes
New nodes can be added by simply updating `nodeConfigs.js`:

```javascript
export const nodeConfigs = {
  newNode: {
    type: 'newNode',
    label: 'New Node',
    inputHandles: [...],
    outputHandles: [...],
    fields: [...],
  }
};
```

#### 3. Context-Based State Management
`PipelineContext` manages global state:
- Node and edge CRUD operations
- ReactFlow event handlers
- Field updates and validation

#### 4. DAG Validation Algorithm
The backend uses **iterative DFS** with state tracking:
- `0` = Unvisited
- `1` = Visiting (in recursion stack)
- `2` = Visited

Detecting a node with state `1` indicates a **back edge** and therefore a cycle.

---

## License

This project was created as part of the VectorShift Frontend Technical Assessment.

---

## Contributing

This is an assessment project, but feel free to fork and experiment with your own enhancements.

---

