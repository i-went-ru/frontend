import { dirname, join, resolve } from "path";

function getAbsolutePath(value) {
  return dirname(require.resolve(join(value, "package.json")));
}

/** @type { import('@storybook/react-vite').StorybookConfig } */
const config = {
    stories: [
      {
        directory: '../../../packages/ui/src/**',
        titlePrefix: 'UI',
        files: '*.stories.*'
      },
    ],
    addons: [
      getAbsolutePath("@storybook/addon-links"),
      getAbsolutePath("@storybook/addon-essentials"),
      getAbsolutePath("@storybook/addon-onboarding"),
      getAbsolutePath("@storybook/addon-interactions"),
    ],
    framework: {
      name: "@storybook/react-vite",
      options: {},
    },
    docs: {
      autodocs: "tag",
    },
  };
  
export default config;