# n8n-nodes-pdf-muhammara

This is an n8n community node that provides PDF encryption functionality using the muhammara library.

[n8n](https://n8n.io/) is a [fair-code licensed](https://docs.n8n.io/reference/license/) workflow automation platform.

> Note: This package is not yet published to npm; use the local development steps below until it is released.

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

See [LOCAL_DEVELOPMENT.md](LOCAL_DEVELOPMENT.md) for setup, linking, and troubleshooting steps.

## Usage

### Node Parameters

- **Binary Property**: Name of the binary property containing the input PDF (default: "data")
- **Password**: Password to encrypt the PDF file (required)
- **Output Filename**: Name for the encrypted output PDF file (default: "encrypted.pdf")

### Example Workflow

An example workflow is provided in [example-workflow.json](example-workflow.json). You can import this workflow into n8n to see how the PDF Encrypt node works:

1. **HTTP Request** or **Read Binary File** node → reads a PDF file
2. **PDF Encrypt** node → encrypts the PDF with a password
3. **Write Binary File** or **Send Email** node → outputs the encrypted PDF

To import the example workflow:
1. Open n8n
2. Click on "Workflows" → "Import from File"
3. Select the [example-workflow.json](example-workflow.json) file
4. Execute the workflow to see the PDF encryption in action

> Note: Starting with n8n 2.0, file operations are restricted to the `~/.n8n-files` directory by default. The example workflow writes the encrypted PDF to that directory (see [n8n v2.0 breaking changes](https://docs.n8n.io/2-0-breaking-changes/?_gl=1*u09ket*_ga*ODg2ODA0MTMwLjE3Njc2MDIxNTM.*_ga_0SC4FF2FH9*czE3Njg5NjczNTYkbzYkZzEkdDE3Njg5Njk0NjIkajYwJGwwJGgw#set-default-value-for-n8n_restrict_file_access_to)).

### Workflow Example Steps

```
When clicking 'Test workflow' → HTTP Request - Download PDF → PDF Encrypt → Read/Write Files from Disk
```

The example downloads a sample PDF, encrypts it with a password, and saves it to ~/.n8n-files/encrypted_document.pdf (update the output path if your n8n instance uses a different files directory).

## Resources

- [n8n community nodes documentation](https://docs.n8n.io/integrations/community-nodes/)
- [muhammara documentation](https://github.com/julianhille/MuhammaraJS)

## License

[MIT](LICENSE)

## TODO

- [ ] Add PDF merge capability.
- [ ] Add PDF split capability.