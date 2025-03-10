// declare module 'eslint-plugin-react-hooks' {
//     import type { ESLint } from 'eslint';
//     const plugin: Omit<ESLint.Plugin, 'configs'> & {
//         // eslint-plugin-react-hooks does not use FlatConfig yet
//         configs: Record<string, ESLint.ConfigData>;
//     };
//     export default plugin;
// }
// TODO: Remove when https://github.com/facebook/react/issues/30119 is resolved
declare module "eslint-plugin-react-hooks" {
    import type { Linter, Rule } from "eslint";

    export const configs: {
        recommended: Linter.Config;
    };

    declare const rules: {
        "rules-of-hooks": Rule.RuleModule;
        "exhaustive-deps": Rule.RuleModule;
    };

    declare const plugin: {
        configs: typeof configs;
        rules: typeof rules;
    };

    export default plugin;
}