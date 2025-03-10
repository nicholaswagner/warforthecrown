/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_ENV: string
    // will add more as needed...
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}