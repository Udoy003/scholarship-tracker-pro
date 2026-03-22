import fs from 'fs';
import { parse } from 'csv-parse/sync';

const csvData = fs.readFileSync('../scholarships.csv', 'utf8');
const records = parse(csvData, { skip_empty_lines: true, from_line: 2 });

const scholarships = records.map(row => {
    let priority = "Medium";
    if (row[12] === "High") priority = "Top";
    else if (row[12] === "Low") priority = "Low";

    return {
        priority: priority,
        name: row[1],
        university: row[3],
        country: row[2],
        degree: row[4],
        field: row[5],
        match: priority === "Top" ? 95 : 85,
        funding: row[6],
        benefits: row[7],
        assistantship: row[8],
        eligibility: row[9],
        deadline: row[10],
        link: row[11],
        competition: row[12],
        notes: row[13]
    };
});

fs.writeFileSync('data.js', `const scholarships = ${JSON.stringify(scholarships, null, 2)};`);
console.log('✅ Generated data.js successfully!');
