
const tableData = [
    ['Header 1', 'Header 2', 'Header 3'],
    ['Row 1 Data 1', 'Row 1 Data 2', 'Row 1 Data 3'],
    ['Row 2 Data 1', 'Row 2 Data 2', 'Row 2 Data 3'],
];

function generateMarkdownTable(data) {
    return data.map(row => row.join(' | ')).join('\n');
}

bot.command('movie', (ctx) => {
    const markdownTable = generateMarkdownTable(tableData);
    const message = `Here is your table:\n\n${markdownTable}`;

    ctx.replyWithMarkdown(message);
});