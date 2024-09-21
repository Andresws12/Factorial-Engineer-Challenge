<!-- Start table of contents -->

## Table of Contents

1. [About The Project](#engineer-challenge)
   - [Welcome to my Challenge](#welcome)
   - [What am I going to present?](#going-to-present)
2. [Built With](#built-with)
3. [Getting Started](#getting-started)
   - [Prerequisites](#prerequisites)
   - [Project installation](#project-installation)
   - [Build and start the service](#build-and-start-service)
     - [Vite localhost](#vite-localhost)
     - [Vite build and preview](#vite-build-and-preview)
   - [Commit recommendations](#commit-recomendations)
4. [Testing and formatting](#testing)
   - [Formatting the code](#formatting-code)
   - [Testing the project](#testing-project)
5. [Folder Structure](#folder-structure)
<!-- End table of contents -->

# <span id="engineer-challenge">🥸Product Growth - Engineer Challenge</span>

<span id="welcome"><font size="4">**Welcome to my Challenge 👋.**</font></span>

First of all, I want to thank you for the opportunity to get to know me, see how I work, and review my code. So, let's dive in!

To tackle this challenge, the first and most important step for me was to understand the task, the business idea, and the proposed product. With that foundation, I focused on developing a real MVP aligned with the current business needs, using the information provided.

First, I worked on understanding the key aspects of the company and its business model, breaking down the areas I found necessary:

![business]

Next, to have a clear reference of what we’re aiming for, I laid out a small example of how a bike configuration could look. Additionally, I researched market references to get a rough idea of the current landscape.

![example]

With this clearer understanding, I moved on to analyze the current state: what I need to know, what I should measure, and what might exist or emerge in the future. This allowed me to build a real MVP, based on all the data and insights discussed above. 

![mvp]

With all the gathered information and a clearer, more defined MVP, I moved on to sketching a basic system architecture based on the available data. For an MVP, I obviously don’t need the full architecture, but it’s important to have a general vision of where I want to go, what I should have or know, and keep that in mind as I work. My focus is on having BFFs (Backend for Frontend) that can manage the necessary data for the frontend, collecting information and working hand in hand with both internal and external APIs.

![architecture]

<span id="going-to-present"><font size="4">**So, what am I going to present?🫵.**</font></span>

Given the limited time available to develop this test and the fact that I’ve already spent a fair amount of time analyzing the MVP jajajaja, my proposal is to deliver a small POC (proof of concept). With this, you’ll be able to see my working style, how I write my code, my best practices, and project structure. However, I’m not aiming to deliver a full MVP, as that wouldn’t be realistic given the scope of what’s being asked or what it could potentially become. Additionally, I want to present a global vision of how I would approach the development of a real MVP. Starting with understanding the business and product, taking into account what we currently have, and ultimately designing a global architecture that can guide the development of a real, viable MVP

## URL🌐:

[URL](https://factorial-engineer-challenge.pages.dev/)

## <span id="built-with">🏗️Built with</span>

**Below are the frameworks and libraries used in this project:**

> - [Vue 3][vue]
> - [Pinia][pinia]
> - [Typescript][typescript]
> - [Bulma][bulma]
> - [Sass][sass]
> - [Prettier][prettier]
> - [Eslint][eslint]
> - [Stylelint][stylelint]
> - [Cypress][cypress]
> - [Jest][jest]

**[Back to top](#table-of-contents)**

## <span id="getting-started">⚙️Getting Started</span>

This section details everything you need to install the project and the steps to follow for installation.

### <span id="prerequisites">🚩Prerequisites</span>

> - **Recomends**: Is recommended use [Vs Code Text Editor] and [Vue Language Features (Volar) extension]
> - **WSL 2** _(Only Windows)_ : Is necessary have a [WSL 2] installed and configured
>   - Run as Administrator in Powershell the command `wsl --install`, if WSL is installed this will show a message indicating that is installed.
>   - Download in VS Code the extension [WSL Extension].
>   - Install a Ubuntu version for windows, for example [Ubuntu 22.04.02 LTS]
> - **Node.js**: Have installed [Node JS] and [NPM] (Normally NPM is included with Node JS)
>   - To install Node.js it is highly recommended to use NVM, with NVM it will be easier to manage the different versions of Node.
>   - To install NVM in Linux (WSL) open the link [install NVM Linux]
>   - **The Node version required to this project is** `20.9.0`
> - **Git**: Have installed [Git] control version
>   - To install Git here is the official documentation [download git].
>   - Another option to install git is to run the command `npm install -g git` (must be installed npm).
> - **PNPM**: Have installed [PNPM] control version
>   - To install pnpm here is the official documentation [download pnpm].
>   - Another option to install git is to run the command `npm install -g pnpm` (must be installed npm).
> - **Type Support For `.vue` Imports in TS**: Since TypeScript cannot handle type information for `.vue` imports, they are shimmed to be a generic Vue component type by default. In most cases this is fine if you don't really care about component prop types outside of templates. However, if you wish to get actual prop types in `.vue` imports (for example to get props validation when using manual `h(...)` calls), you can enable Volar's Take Over mode by following these steps:
>   - Run `Extensions: Show Built-in Extensions` from VS Code's command palette, look for `TypeScript and JavaScript Language Features`, then right click and select `Disable (Workspace)`. By default, Take Over mode will enable itself if the default TypeScript extension is disabled.
>   - Reload the VS Code window by running `Developer: Reload Window` from the command palette.

### <span id="project-installation">🖥️Project installation</span>

**Before starting the installation make sure that the terminal is in the folder where you want to have your projects.**

1. Clone the repository
   ```sh
   git clone https://github.com/Andresws12/Factorial-Engineer-Challenge.git
   ```
2. Open the folder and run the required commands for installation
   ```sh
   cd Factorial-Engineer-Challenge
   code .
   pnpm install
   ```
3. Prepare husky with the correct permissions
   ```sh
   pnpm kusky:prepare
   ```

### <span id="build-and-start-service">🚀Build and Start the service</span>

#### <span id="vite-localhost">💻Vite localhost</span>

Start Vite dev server in the current directory.

1.  Builds and starts containers for the service
    ```sh
    pnpm dev
    ```
2.  Check that the service is running
    ```sh
     http://localhost:5173/
    ```

#### <span id="vite-build-and-preview">🧱Vite build and preview</span>

1. Build for specific environments
   ```sh
   pnpm build
   pnpm build:development
   pnpm build:production
   ```
2. Preview the environment build locally
   ```sh
   pnpm preview
   ```

**[Back to top](#table-of-contents)**

## <span id="testing">🧪Testing and formatting</span>

I have prepared simple testing and formatting commands to make our project more coherent.

### <span id="formatting-code">🖊️Formatting the code</span>

**Below is the different commands to check and format the code**

1. **Run the lint**

   - Check lint
     ```sh
     pnpm lint:check
     ```
   - Check and fix lint
     ```sh
     pnpm lint
     ```

2. **Run the stylelint**

   - Check stylelint
     ```sh
     pnpm stylelint:check
     ```
   - Check and fix stylelint
     ```sh
     pnpm stylelint
     ```

3. **Run the format**

   - Check format
     ```sh
     pnpm format:check
     ```
   - Check and fix format
     ```sh
     pnpm format
     ```

4. **Run all**

   - Check all (Lint, stylelint and format)

   ```sh
   pnpm check:all
   ```

   - Check and fix all (Lint, stylelint and format)

   ```sh
   pnpm fix:all
   ```

### <span id="testing-project">🔬Testing the project</span>

1. Unit Test

   Commands:

   ```sh
   pnpm test:unit
   pnpm test:coverage
   ```

2. Unit e2e

   Commands:

   ```sh
   pnpm test:e2e-cy
   pnpm test:e2e-cy-cli
   ```

   **¡Important! with Cypress** If you use Linux or WSL you will need install any dependencies:

   ```sh
   sudo apt update

   sudo apt upgrade

   sudo apt-get install libgtk2.0-0 libgtk-3-0 libgbm-dev libnotify-dev libgconf-2-4 libnss3 libxss1 libasound2 libxtst6 xauth xvfb

   sudo apt install wget

   wget https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb

   sudo dpkg -i google-chrome-stable_current_amd64.deb

   sudo apt-get install -f
   ```

**[Back to top](#table-of-contents)**

## <span id="folder-structure">📂Folder structure</span>

```
.Factorial-Engineer-Challenge
├── cypress                  // Cypress test files
│   ├── component               // Test files for components
│   ├── e2e                  // E2e test files
│   │   └── utilities              // E2e utilities (i.e: Constants with selectors)
│   ├── fixtures             // Cypress fixtures
│   └── support              // Cypress examples
├── dist                     // Compiled files (only when the project has been compiled)
├── docs                     // Documentation files
│   └── img                     // README.md images
├── public                   // Content of application public data
└── src                      // Content of application code
    ├── assets                  // All assets used by the application
    │   ├── fonts                   // Font files (woff2, ttf...)
    │   └── img                     // Project images
    ├── components              // Reusable Components
    ├── localization            // All translations
    │   └── locales
    │       ├── en             // All translations from English
    │       └── es             // All translations from Spanish
    ├── models                  // Common models to code structure
    │   └── utils                   // Common models
    ├── routes                  // All routes
    ├── stores                  // Common data
    ├── styles                  // All global directories from the styles
    │   ├── animations              // All global animations
    │   ├── mixins                  // All global mixins
    │   ├── modifiers               // All global modifiers
    │   ├── modules                 // All global modules
    │   ├── transitions             // All global transitions
    │   └── variables               // All global variables
    ├── tests                   // Unit tests
    │   ├── components              // Components unit tests files
    │   └── datastore               // Data unit tests files
    ├── views                   // Components with the views
    └── webservices             // Api connections files
        └── models                  // Models to api connections
```

**[Back to top](#table-of-contents)**

<!-- Start Markdown images -->

[architecture]: docs/img/Architecture.svg
[business]: docs/img/Business.svg
[example]: docs/img/Example.svg
[mvp]: docs/img/MVP.svg
[technologies]: docs/img/Technologies.svg

<!-- End Markdown images -->

<!-- Start Markdown links -->

[Git]: https://git-scm.com
[bulma]: https://bulma.io/
[sass]: https://sass-lang.com/
[PNPM]: https://pnpm.io/
[download pnpm]: https://pnpm.io/installation
[prettier]: https://prettier.io/
[stylelint]: https://stylelint.io/
[jest]: https://jestjs.io/
[cypress]: https://docs.cypress.io/
[Node JS]: https://nodejs.org/es/about
[download git]: https://git-scm.com/downloads
[typescript]: https://www.typescriptlang.org/
[vue]: https://vuejs.org/guide/quick-start.html
[pinia]: https://pinia.vuejs.org/introduction.html
[Vs Code Text Editor]: https://code.visualstudio.com/
[NPM]: https://www.bambu-mobile.com/que-es-npm-de-node-js/
[WSL 2]: https://learn.microsoft.com/es-es/windows/wsl/about
[eslint]: https://eslint.org/docs/latest/user-guide/getting-started
[WSL Extension]: https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-wsl
[Vue Language Features (Volar) extension]: https://marketplace.visualstudio.com/items?itemName=Vue.volar
[install NVM Linux]: https://learn.microsoft.com/es-es/windows/dev-environment/javascript/nodejs-on-wsl#install-nvm-nodejs-and-npm
[Ubuntu 22.04.02 LTS]: https://apps.microsoft.com/store/detail/ubuntu-22042-lts/9PN20MSR04DW?hl=en-us&gl=us&activetab=pivot%3Aoverviewtab

<!-- End Markdown links -->
