#!/usr/bin/env -S npx tsx

// remember to chmod + x this file to run it easily
import { readFile, writeFile } from 'node:fs/promises';

const filepath = './README.md';
const upsert = (data: string, marker: string, value: string): string => {
    // Create a dynamic regex to match the given pattern
    const regex = new RegExp(`<!--\\s*<${marker}>\\s*-->([\\s\\S]*?)<!--\\s*<${marker}\\/?>\\s*-->`, 'g');
    // Replace all matches with the new text
    return data.replace(regex, `<!-- <${marker}> -->${value}<!-- <${marker}/> -->`);
};

const marker = "version_number";
const newText = "0.0.1";

readFile(filepath, 'utf-8')
    .then((data) => {
        const output = upsert(data, marker, newText);
        return writeFile(filepath, output);
    })
    .catch((error) => {
        console.error('Error:', error);
    });