/**
 * Slugify a string by converting it to lowercase, removing diacritics, and replacing non-alphanumeric characters with underscores.
 * This implementation chooses to retain the "/" character so that I can create a slugged folder structure that the user will recognize.
 */
const slugify = (str: string) =>
    str
        .toLowerCase()
        .normalize("NFD") // Convert accented chars to base form
        .replace(/[\u0300-\u036f]/g, "") // Remove diacritics
        .replace(/[^a-z0-9\/]+/g, "_") // Replace non-alphanumeric (except `/`) with `_`
        .replace(/_+/g, "_") // Collapse multiple underscores into one
        .replace(/^_+|_+$/g, ""); // Trim leading/trailing `_`

export default slugify;