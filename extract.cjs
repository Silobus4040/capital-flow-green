const fs = require('fs');
const pdfjsLib = require('pdfjs-dist/legacy/build/pdf.js');

async function extractText(inputFile, outputFile) {
    const data = new Uint8Array(fs.readFileSync(inputFile));
    const doc = await pdfjsLib.getDocument({ data }).promise;
    
    let allText = '';
    for (let i = 1; i <= doc.numPages; i++) {
        const page = await doc.getPage(i);
        const textContent = await page.getTextContent();
        const text = textContent.items.map(item => item.str).join(' ');
        allText += '\n=== PAGE ' + i + ' ===\n';
        allText += text + '\n';
    }
    
    fs.writeFileSync(outputFile, allText, 'utf8');
    console.log('Extracted to ' + outputFile);
}

async function main() {
    await extractText('Re_Hello.pdf', 're_hello_text.txt');
    await extractText('Gmail_PML.pdf', 'gmail_pml_text.txt');
}

main().catch(err => console.error('Error:', err.message));
