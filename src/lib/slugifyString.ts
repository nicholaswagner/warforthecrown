// const slugify = (str: string) => {
//     return str.trim().replace(/\s+/g, "_").toLowerCase().split('#')[0].trim();
// }



/**
 * str will be something like: "File Name with spacés and #hashes and sometimes ^carrots.optionalExtension"
    need to break it down into something easier to search for in a hash table that's less prone to breaking
    - remove leading and trailing whitespace
    - replace spaces with underscores
    - lowercase everything
    - split on # and take the first part
    - if there's no extension, should assume its an .md file

*/

export const slugify = (str: string) =>
    str
        .toLowerCase()
        .normalize("NFD") // Convert accented chars to base form
        .replace(/[\u0300-\u036f]/g, "") // Remove diacritics
        .replace(/[^a-z0-9_\/]+/g, "_") // Replace non-alphanumeric except `_`
        .replace(/^_+|_+$/g, ""); // Trim leading/trailing `_`


// export const slugify = (str: string) => {
//     return str.trim().toLowerCase().replace(/\s+/g, "_")
// }

export const trimSlugifiedAnchorRefs = (str: string) => {
    return str.split('#')[0]
}

