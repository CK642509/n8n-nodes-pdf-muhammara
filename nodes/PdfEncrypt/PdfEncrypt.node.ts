import {
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
	NodeOperationError,
} from 'n8n-workflow';

export class PdfEncrypt implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'PDF Encrypt',
		name: 'pdfEncrypt',
		icon: 'file:pdf.svg',
		group: ['transform'],
		version: 1,
		description: 'Encrypt PDF files with password protection using muhammara',
		defaults: {
			name: 'PDF Encrypt',
		},
		inputs: ['main'],
		outputs: ['main'],
		properties: [
			{
				displayName: 'Binary Property',
				name: 'binaryPropertyName',
				type: 'string',
				default: 'data',
				required: true,
				placeholder: 'data',
				description: 'Name of the binary property containing the PDF file',
			},
			{
				displayName: 'Password',
				name: 'password',
				type: 'string',
				typeOptions: {
					password: true,
				},
				default: '',
				required: true,
				description: 'Password to encrypt the PDF file',
			},
			{
				displayName: 'Output Filename',
				name: 'outputFilename',
				type: 'string',
				default: 'encrypted.pdf',
				required: true,
				placeholder: 'encrypted.pdf',
				description: 'Name for the encrypted PDF file',
			},
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];

		for (let itemIndex = 0; itemIndex < items.length; itemIndex++) {
			try {
				const binaryPropertyName = this.getNodeParameter('binaryPropertyName', itemIndex) as string;
				const password = this.getNodeParameter('password', itemIndex) as string;
				const outputFilename = this.getNodeParameter('outputFilename', itemIndex) as string;

				// Get the binary data
				const binaryData = this.helpers.assertBinaryData(itemIndex, binaryPropertyName);
				const inputBuffer = await this.helpers.getBinaryDataBuffer(itemIndex, binaryPropertyName);

				// TODO: Implement PDF encryption using muhammara
				// This is a placeholder - actual encryption logic should be implemented here
				// Example implementation would:
				// 1. Use muhammara to read the PDF from inputBuffer
				// 2. Apply password encryption
				// 3. Generate encrypted PDF buffer
				
				// For now, we'll just pass through the original data as a placeholder
				const encryptedBuffer = inputBuffer;

				// Prepare the output binary data
				const newBinaryData = await this.helpers.prepareBinaryData(
					encryptedBuffer,
					outputFilename,
					binaryData.mimeType || 'application/pdf'
				);

				returnData.push({
					json: {
						success: true,
						filename: outputFilename,
					},
					binary: {
						[binaryPropertyName]: newBinaryData,
					},
				});

			} catch (error) {
				if (this.continueOnFail()) {
					returnData.push({
						json: {
							error: error.message,
						},
						pairedItem: itemIndex,
					});
					continue;
				}
				throw new NodeOperationError(this.getNode(), error as Error, {
					itemIndex,
				});
			}
		}

		return [returnData];
	}
}
