import {
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
	NodeOperationError,
} from 'n8n-workflow';

import * as muhammara from 'muhammara';

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

				// Encrypt PDF using muhammara
				const { PDFWStreamForBuffer, PDFRStreamForBuffer } = muhammara;
				
				const input = new PDFRStreamForBuffer(inputBuffer);
				const output = new PDFWStreamForBuffer();
				
				// Using the same password for user and owner provides a single-password protection model
				// This matches the reference implementation and is appropriate for use cases like payroll documents
				muhammara.recrypt(input, output, {
					password: password,
					userPassword: password,
					ownerPassword: password,
					userProtectionFlag: 4, // Printing allowed
				});
				
				const encryptedBuffer = output.buffer;

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
				const errorMessage = error instanceof Error ? error.message : 'Unknown error during PDF encryption';
				if (this.continueOnFail()) {
					returnData.push({
						json: {
							error: errorMessage,
						},
						pairedItem: itemIndex,
					});
					continue;
				}
				throw new NodeOperationError(
					this.getNode(), 
					`Failed to encrypt PDF: ${errorMessage}`,
					{ itemIndex }
				);
			}
		}

		return [returnData];
	}
}
