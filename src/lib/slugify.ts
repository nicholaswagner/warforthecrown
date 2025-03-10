const slugify = (str: string) =>
    str
        .toLowerCase()
        .normalize("NFD") // Convert accented chars to base form
        .replace(/[\u0300-\u036f]/g, "") // Remove diacritics
        .replace(/[^a-z0-9\/]+/g, "_") // Replace non-alphanumeric (except `/`) with `_`
        .replace(/_+/g, "_") // Collapse multiple underscores into one
        .replace(/^_+|_+$/g, ""); // Trim leading/trailing `_`

export default slugify;