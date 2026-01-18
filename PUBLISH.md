# Publishing to npm

This guide explains how to publish the n8n-nodes-pdf-muhammara package to npm.

## Prerequisites

1. **npm account**: Create an account at [npmjs.com](https://www.npmjs.com/signup) if you don't have one
2. **npm CLI logged in**: You must be logged in to npm on your local machine
3. **Package ready**: Ensure your package is built and tested locally

## Step-by-Step Publishing Guide

### Step 1: Verify Your npm Account

```bash
# Check if you're logged in
npm whoami

# If not logged in, log in to npm
npm login
```

You'll be prompted to enter:
- Username
- Password
- Email
- One-time password (if 2FA is enabled)

### Step 2: Prepare Your Package

Ensure your package.json has the correct information:

**Important**: Before publishing, update the following fields in package.json:
- `author.email`: Replace `your-email@example.com` with your actual email address
- `author.name`: Update with your name or organization
- `version`: Ensure the version number is correct

```json
{
  "name": "n8n-nodes-pdf-muhammara",
  "version": "0.1.0",
  "description": "n8n custom node for PDF encryption using muhammara",
  "author": {
    "name": "Your Name",
    "email": "your.actual.email@example.com"
  },
  "keywords": [
    "n8n-community-node-package",
    "n8n",
    "pdf",
    "encryption",
    "muhammara"
  ],
  "license": "MIT",
  "repository": {
    "type": "git",
    "url": "git+https://github.com/CK642509/n8n-nodes-pdf-muhammara.git"
  }
}
```

**Important**: The package name must include "n8n-nodes-" prefix and include "n8n-community-node-package" in keywords for it to be discoverable in n8n.

### Step 3: Update Version Number

Before each publish, update the version number in package.json following [Semantic Versioning](https://semver.org/):

```bash
# For bug fixes (0.1.0 → 0.1.1)
npm version patch

# For new features (0.1.0 → 0.2.0)
npm version minor

# For breaking changes (0.1.0 → 1.0.0)
npm version major
```

Or manually edit package.json:
```json
{
  "version": "0.1.0"  // Update this
}
```

### Step 4: Build the Package

```bash
# Install dependencies
npm install

# Run linting (fix any issues)
npm run lint
# or fix automatically
npm run lintfix

# Build the package
npm run build
```

Verify the build:
```bash
# Check that dist folder exists
ls -la dist/

# Should contain:
# - dist/nodes/PdfEncrypt/PdfEncrypt.node.js
# - dist/nodes/PdfEncrypt/PdfEncrypt.node.d.ts
# - dist/nodes/PdfEncrypt/pdf.svg
```

### Step 5: Test the Package Locally

Before publishing, test the package:

```bash
# Create a test package
npm pack

# This creates a .tgz file like: n8n-nodes-pdf-muhammara-0.1.0.tgz
# Install it locally in a test n8n instance
cd /path/to/test/n8n
npm install /path/to/n8n-nodes-pdf-muhammara-0.1.0.tgz
```

### Step 6: Publish to npm

```bash
# Dry run to see what would be published
npm publish --dry-run

# Review the output - ensure only necessary files are included
# Files in .npmignore should not appear

# Publish to npm (public)
npm publish --access public

# If successful, you'll see:
# + n8n-nodes-pdf-muhammara@0.1.0
```

### Step 7: Verify Publication

1. Check your package on npm:
   - Visit: https://www.npmjs.com/package/n8n-nodes-pdf-muhammara
   
2. Test installation from npm:
   ```bash
   npm install -g n8n-nodes-pdf-muhammara
   ```

3. Check in n8n community nodes:
   - Your package should appear in n8n's community nodes search within a few minutes

### Step 8: Create a Git Tag (Optional but Recommended)

```bash
# Create a git tag for the release
git tag -a v0.1.0 -m "Release version 0.1.0"

# Push the tag to GitHub
git push origin v0.1.0

# Push all tags
git push --tags
```

## Publishing Updates

When you need to publish an update:

1. Make your code changes
2. Update version: `npm version patch` (or minor/major)
3. Build: `npm run build`
4. Test locally
5. Publish: `npm publish --access public`
6. Create and push git tag

## Important Notes

### Package Naming
- Must start with `n8n-nodes-`
- Use lowercase and hyphens
- Keep it descriptive but concise

### Keywords
Always include these keywords in package.json:
- `n8n-community-node-package` (required for n8n discovery)
- `n8n`
- Other relevant keywords for searchability

### Version Management
- Follow [Semantic Versioning](https://semver.org/)
- Never unpublish versions (use deprecation instead)
- Always increment version before publishing

### .npmignore
Ensure you're not publishing unnecessary files:
```
*.ts
tsconfig.json
nodes
.github
.vscode
.eslintrc.js
gulpfile.js
```

Only the `dist` folder and essential files should be published.

## Unpublishing (Use with Caution)

You can only unpublish within 72 hours of publishing:

```bash
# Unpublish a specific version
npm unpublish n8n-nodes-pdf-muhammara@0.1.0

# Unpublish entire package (not recommended)
npm unpublish n8n-nodes-pdf-muhammara --force
```

**Note**: Unpublishing is discouraged. Use deprecation instead:

```bash
# Deprecate a version
npm deprecate n8n-nodes-pdf-muhammara@0.1.0 "This version has a critical bug"
```

## Troubleshooting

### "You do not have permission to publish"
- Ensure you're logged in: `npm whoami`
- Check if the package name is already taken
- Verify you're using `--access public` for scoped packages

### "Version already exists"
- Update version number in package.json
- Use `npm version patch/minor/major` to increment

### "Package name too similar to existing package"
- Choose a different, more unique name
- Add more descriptive qualifiers

### Build fails before publish
- Run `npm install` to ensure dependencies are installed
- Check TypeScript errors: `npm run build`
- Fix linting issues: `npm run lintfix`

## Best Practices

1. **Always test before publishing**: Use `npm pack` and test locally
2. **Write clear commit messages**: Especially for version bumps
3. **Update changelog**: Keep a CHANGELOG.md with version history
4. **Comprehensive README**: Include installation, usage, and examples
5. **Semantic versioning**: Follow semver strictly
6. **Git tags**: Tag releases in git for better tracking
7. **Monitor issues**: Watch for issues on npm and GitHub
8. **Security**: Never include credentials or sensitive data
9. **Dependencies**: Keep dependencies up to date and minimal
10. **Documentation**: Keep README and examples current with each release

## Resources

- [npm documentation](https://docs.npmjs.com/)
- [Publishing packages](https://docs.npmjs.com/packages-and-modules/contributing-packages-to-the-registry)
- [n8n community nodes](https://docs.n8n.io/integrations/creating-nodes/)
- [Semantic Versioning](https://semver.org/)

## Support

If you encounter issues during publishing:
- Check npm status: https://status.npmjs.org/
- npm support: https://www.npmjs.com/support
- n8n community: https://community.n8n.io/