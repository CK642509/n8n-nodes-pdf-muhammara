# n8n-nodes-pdf-muhammara

This is an n8n community node that provides PDF encryption functionality using the muhammara library.

[n8n](https://n8n.io/) is a [fair-code licensed](https://docs.n8n.io/reference/license/) workflow automation platform.

## Features

- Encrypt PDF files with password protection
- Accept binary PDF input from previous nodes
- Simple configuration with password and output filename settings
- Seamless integration with n8n workflows

## Installation

### For n8n Cloud or Self-hosted n8n

1. Go to **Settings** > **Community Nodes**
2. Select **Install**
3. Enter `n8n-nodes-pdf-muhammara` in the **Enter npm package name** field
4. Agree to the risks of using community nodes
5. Select **Install**

### For npm (Global Installation)

```bash
npm install -g n8n-nodes-pdf-muhammara
```

## Local Development and Testing

Follow these steps to test this custom node locally before publishing:

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)
- n8n installed globally or locally

### Step 1: Clone and Build

```bash
# Clone the repository
git clone https://github.com/CK642509/n8n-nodes-pdf-muhammara.git
cd n8n-nodes-pdf-muhammara

# Install dependencies
npm install

# Build the node
npm run build
```

### Step 2: Link to n8n

There are two methods to test your custom node locally:

#### Method A: Using npm link (Recommended for Development)

```bash
# In the n8n-nodes-pdf-muhammara directory
npm link

# Link this package to your global n8n installation
# If you have n8n installed globally:
cd $(npm root -g)/n8n
npm link n8n-nodes-pdf-muhammara

# Or if you have n8n installed locally in a project:
cd /path/to/your/n8n/project
npm link n8n-nodes-pdf-muhammara
```

#### Method B: Using CUSTOM_EXTENSION_ENV Environment Variable

```bash
# Set the environment variable to point to your node directory
export N8N_CUSTOM_EXTENSIONS="/home/runner/work/n8n-nodes-pdf-muhammara/n8n-nodes-pdf-muhammara"

# Start n8n
n8n start
```

### Step 3: Start n8n and Test

```bash
# Start n8n (if not already running)
n8n start

# Or start with the custom extensions path:
N8N_CUSTOM_EXTENSIONS="/path/to/n8n-nodes-pdf-muhammara" n8n start
```

### Step 4: Verify the Node in n8n

1. Open your browser and navigate to n8n (usually http://localhost:5678)
2. Create a new workflow
3. Search for "PDF Encrypt" in the nodes panel
4. The node should appear with your custom icon

### Step 5: Test the Node

To test the PDF encryption node:

1. Add a node that can read or generate PDF files (e.g., HTTP Request, Read Binary File)
2. Add the "PDF Encrypt" node after it
3. Configure the parameters:
   - **Binary Property**: The property name containing the PDF (default: "data")
   - **Password**: Your encryption password
   - **Output Filename**: Name for the encrypted PDF
4. Add a node to output or save the encrypted PDF (e.g., Write Binary File)
5. Execute the workflow

### Development Workflow

When making changes to the node:

```bash
# Watch for changes and rebuild automatically
npm run dev

# In another terminal, restart n8n to see changes
# (n8n needs to be restarted to pick up node changes)
```

### Troubleshooting

**Node doesn't appear in n8n:**
- Ensure the build was successful (`npm run build`)
- Check that the `dist` folder was created
- Verify n8n was restarted after linking the node
- Check n8n logs for any errors loading the custom node

**Binary data issues:**
- Ensure the previous node outputs binary data
- Verify the binary property name matches the configured value
- Check that the input file is a valid PDF

**Build errors:**
- Run `npm install` to ensure all dependencies are installed
- Check TypeScript version compatibility
- Review the error messages in the build output

## Usage

### Node Parameters

- **Binary Property**: Name of the binary property containing the input PDF (default: "data")
- **Password**: Password to encrypt the PDF file (required)
- **Output Filename**: Name for the encrypted output PDF file (default: "encrypted.pdf")

### Example Workflow

An example workflow is provided in `example-workflow.json`. You can import this workflow into n8n to see how the PDF Encrypt node works:

1. **HTTP Request** or **Read Binary File** node → reads a PDF file
2. **PDF Encrypt** node → encrypts the PDF with a password
3. **Write Binary File** or **Send Email** node → outputs the encrypted PDF

To import the example workflow:
1. Open n8n
2. Click on "Workflows" → "Import from File"
3. Select the `example-workflow.json` file
4. Execute the workflow to see the PDF encryption in action

### Workflow Example Steps

```
Manual Trigger → HTTP Request (Download PDF) → PDF Encrypt → Write Binary File
```

The example downloads a sample PDF, encrypts it with a password, and saves it to `/tmp/encrypted_document.pdf`.

## Compatibility

This node is compatible with n8n version 0.187.0 and above.

## Resources

- [n8n community nodes documentation](https://docs.n8n.io/integrations/community-nodes/)
- [muhammara documentation](https://github.com/julianhille/MuhammaraJS)

## License

[MIT](LICENSE)