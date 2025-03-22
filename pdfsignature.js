
const fs = require('fs');
const path = require('path');
const { PDFDocument } = require('pdf-lib');
const readline = require('readline');
const { rgb } = require('pdf-lib');

// Create a readline interface for user input
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

async function addSignatureToPdf(inputPath, outputPath, signatureInfo) {
    try {
        // Read the PDF file
        const pdfBytes = fs.readFileSync(inputPath);

        // Load the PDF document
        const pdfDoc = await PDFDocument.load(pdfBytes);

        // Get the first page of the document
        const pages = pdfDoc.getPages();
        const firstPage = pages[pages.length - 1]; // Sign the last page

        // Get page dimensions
        const { width, height } = firstPage.getSize();

        // Draw the signature text
        firstPage.drawText(signatureInfo.text, {
            x: signatureInfo.x || width - 200,
            y: signatureInfo.y || 100,
            size: signatureInfo.fontSize || 12,
            color: rgb(0, 0, 0),
        });

        // If you have a signature image (base64)
        if (signatureInfo.imageBase64) {
            const signatureImageBytes = Buffer.from(signatureInfo.imageBase64, 'base64');
            const signatureImage = await pdfDoc.embedPng(signatureImageBytes);

            firstPage.drawImage(signatureImage, {
                x: signatureInfo.imageX || width - 200,
                y: signatureInfo.imageY || 120,
                width: signatureInfo.imageWidth || 100,
                height: signatureInfo.imageHeight || 30,
            });
        }

        // Save the PDF
        const modifiedPdfBytes = await pdfDoc.save();
        fs.writeFileSync(outputPath, modifiedPdfBytes);

        console.log(`PDF successfully signed and saved to: ${outputPath}`);
        return true;
    } catch (error) {
        console.error('Error adding signature to PDF:', error);
        return false;
    }
}

function promptForSignatureInfo() {
    return new Promise((resolve) => {
        const signatureInfo = {};

        rl.question('Enter signature text: ', (text) => {
            signatureInfo.text = text;

            rl.question('Enter X position (or press Enter for default): ', (x) => {
                signatureInfo.x = x ? parseInt(x) : null;

                rl.question('Enter Y position (or press Enter for default): ', (y) => {
                    signatureInfo.y = y ? parseInt(y) : null;

                    rl.question('Enter font size (or press Enter for default): ', (fontSize) => {
                        signatureInfo.fontSize = fontSize ? parseInt(fontSize) : null;

                        rl.question('Do you want to add a signature image? (y/n): ', (answer) => {
                            if (answer.toLowerCase() === 'y') {
                                rl.question('Enter the path to your signature image file: ', (imagePath) => {
                                    try {
                                        const imageBuffer = fs.readFileSync(imagePath);
                                        signatureInfo.imageBase64 = imageBuffer.toString('base64');
                                        resolve(signatureInfo);
                                    } catch (error) {
                                        console.error('Error reading image file:', error);
                                        signatureInfo.imageBase64 = null;
                                        resolve(signatureInfo);
                                    }
                                });
                            } else {
                                resolve(signatureInfo);
                            }
                        });
                    });
                });
            });
        });
    });
}

async function main() {
    try {
        rl.question('Enter the path to the PDF file: ', async (inputPath) => {
            // Check if file exists
            if (!fs.existsSync(inputPath)) {
                console.error('File does not exist:', inputPath);
                rl.close();
                return;
            }

            // Get the directory and filename
            const directory = path.dirname(inputPath);
            const filename = path.basename(inputPath, '.pdf');
            const outputPath = path.join(directory, `${filename}_signed.pdf`);

            // Get signature information
            const signatureInfo = await promptForSignatureInfo();

            // Add signature to PDF
            const success = await addSignatureToPdf(inputPath, outputPath, signatureInfo);

            if (success) {
                console.log('PDF signing process completed successfully.');
            } else {
                console.error('PDF signing process failed.');
            }

            rl.close();
        });
    } catch (error) {
        console.error('Error in main process:', error);
        rl.close();
    }
}

// Start the application
main();
