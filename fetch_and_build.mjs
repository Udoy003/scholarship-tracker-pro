import fs from 'fs';
import { parse } from 'csv-parse/sync';

async function run() {
    console.log("Fetching live data from Google Sheets...");
    const res = await fetch('https://docs.google.com/spreadsheets/d/1ywGs9C0x7RnyGNe6NU5pgvUGfiGIrtW4UiVcuBP81U4/export?format=csv');
    const csvData = await res.text();
    const records = parse(csvData, { columns: true, skip_empty_lines: true });

    const scholarships = records.map(row => {
        return {
            name: row['Scholarship/Program Name'] || 'Unknown Program',
            university: row['University Name'] || 'Unknown University',
            country: row['Country'] || '',
            degree: row['Degree Level'] || '',
            priority: row['Priority'] || 'Low',
            match: parseInt(row['Program Match (%)']) || 0,
            field: row['Field of Study / Department'] || '',
            deadline: row['Application Deadline'] || 'TBD',
            funding: row['Funding Type'] || '',
            assistantship: row['Assistantship'] || '',
            eligibility: row['Eligibility & Requirements'] || '',
            notes: row['Comment'] || '',
            link: row['Application Link'] || '#',
            benefits: row['Benefits Details'] || '',
            competition: row['Scholarship Competition'] || ''
        };
    });

    fs.writeFileSync('data.js', `const scholarships = ${JSON.stringify(scholarships, null, 2)};`);
    console.log('✅ Generated data.js successfully from live Google Sheet!');
}

run();
