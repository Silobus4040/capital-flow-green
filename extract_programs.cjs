const fs = require('fs');

// Read the raw TypeScript file
const filePath = './src/data/loanPrograms.ts';
let rawContent = fs.readFileSync(filePath, 'utf8');

// Strip out the HTML tags, leaving just the text
function stripHtml(html) {
    return html
        .replace(/<[^>]*>?/gm, '\n') // Replace HTML tags with newlines
        .replace(/\n\s*\n/g, '\n')     // Remove multiple blank lines
        .replace(/&nbsp;/g, ' ')       // Decode spaces
        .trim();
}

// Extract objects (very basic regex approach, assuming a specific structure)
const programs = [];
const regex = /id:\s*"([^"]+)",\s*name:\s*"([^"]+)",\s*interestRate:\s*"([^"]+)",\s*minimumLoanAmount:\s*"([^"]+)",\s*description:\s*"([^"]+)",\s*terms:\s*`([\s\S]*?)`/g;

let match;
while ((match = regex.exec(rawContent)) !== null) {
    programs.push({
        id: match[1],
        name: match[2],
        interestRate: match[3],
        minimumLoanAmount: match[4],
        description: match[5],
        terms: stripHtml(match[6])
    });
}

// Format as clean text
let outputText = "# CCIF MASTER LOAN PROGRAMS KNOWLEDGE BASE\n\n";

programs.forEach(p => {
    outputText += `## PROGRAM: ${p.name}\n`;
    outputText += `- ID: ${p.id}\n`;
    outputText += `- Interest Rate: ${p.interestRate}\n`;
    outputText += `- Minimum Loan Amount: ${p.minimumLoanAmount}\n`;
    outputText += `- Summary: ${p.description}\n\n`;
    outputText += `### DETAILED TERMS:\n${p.terms}\n`;
    outputText += `\n--------------------------------------------------\n\n`;
});

// Save to text file
fs.writeFileSync('CCIF_Master_Programs.txt', outputText);
console.log("Success! Created CCIF_Master_Programs.txt");
