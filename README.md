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

[example-workflow.json](example-workflow.json) provides a sample workflow with these steps:
1. **When clicking 'Test workflow'** → manual trigger
2. **HTTP Request - Download PDF** → fetch sample PDF
3. **PDF Encrypt** → apply the password
4. **Read/Write Files from Disk** → save `encrypted_document.pdf`

Import it in n8n via **Workflows → Import from File**, pick the JSON, and run.

> n8n 2.0 restricts file writes to `~/.n8n-files`; the example saves there (see [n8n v2.0 breaking changes](https://docs.n8n.io/2-0-breaking-changes/?_gl=1*u09ket*_ga*ODg2ODA0MTMwLjE3Njc2MDIxNTM.*_ga_0SC4FF2FH9*czE3Njg5NjczNTYkbzYkZzEkdDE3Njg5Njk0NjIkajYwJGwwJGgw#set-default-value-for-n8n_restrict_file_access_to)).

### Workflow Example Steps

```
Test workflow → HTTP Request (download PDF) → PDF Encrypt → Read/Write Files from Disk
```

The example downloads a sample PDF, encrypts it with your password, and saves it to `~/.n8n-files/encrypted_document.pdf` (change the path if your files directory differs).

## Resources

- [n8n community nodes documentation](https://docs.n8n.io/integrations/community-nodes/)
- [muhammara documentation](https://github.com/julianhille/MuhammaraJS)

## License

[MIT](LICENSE)

## TODO

- [ ] Add PDF merge capability.
- [ ] Add PDF split capability.