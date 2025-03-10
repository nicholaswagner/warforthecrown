#!/usr/bin/env -S npx tsx

import { readFileSync } from "fs";


/**
 * Parses a .gitignore file and returns an array of comma-separated strings
 * @param filePath - Path to the .gitignore file
 * @returns Array of comma-separated strings
 */

export const getGitIgnorables = (filePath: string): string[] => {
    const fileContent = readFileSync(filePath, "utf8");

    // Process lines: trim, remove comments, and empty lines
    const entries = fileContent
        .split("\n")
        .map(line => line.trim()) // Remove extra spaces
        .filter(line => line && !line.startsWith("#")); // Remove empty & comment lines

    const result: string[] = [];

    for (let i = 0; i < entries.length; i += 1) {
        result.push(entries.slice(i, i + 1).join(","));
    }

    return result;
};


const targetDir = process.argv[2];
// Example Usage
const gitignoreEntries = getGitIgnorables(targetDir + "/.gitignore");
console.log(gitignoreEntries);


