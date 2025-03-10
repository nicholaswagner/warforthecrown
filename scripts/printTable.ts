export const printTable = (data: (string | number)[][]) => {
    // Calculate the maximum width for each column
    const columnWidths = data[0].map((_, colIndex) =>
        Math.max(...data.map(row => String(row[colIndex]).length))
    );

    // Print each row, aligning columns
    data.forEach(row => {
        const formattedRow = row.map((cell, colIndex) =>
            String(cell).padEnd(columnWidths[colIndex]) // Align to the left (pad with spaces)
        ).join(' | '); // Separate columns with " | "
        console.log(formattedRow);
    });
};

