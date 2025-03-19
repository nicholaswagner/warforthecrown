import { slugify } from 'remark-obsidious';
const extractMarkdownHeaderContent = (
  markdown: string,
  anchor: string,
): string | null => {
  const lines = markdown.split('\n');
  let result: string[] | null = null;

  for (const line of lines) {
    // Check if the line is a header
    const headerMatch = line.match(/^#{1,6} (.+)/);
    if (headerMatch) {
      // Extract the header text
      const headerText = headerMatch[1];
      // Convert the header text to an anchor format using slugify
      const headerAnchor = slugify(headerText);

      if (headerAnchor === anchor) {
        // If we find the matching header, start collecting content
        result = [line];
      } else if (result) {
        // If we have already found the matching header and encounter another header, stop collecting content
        break;
      }
    } else if (result) {
      // If we are collecting content, add the line to the result
      result.push(line);
    }
  }

  // Return the collected content as a single string if found, otherwise return null
  return result ? result.join('\n').trim() : null;
}


export default extractMarkdownHeaderContent


