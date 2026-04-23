export interface Feature {
  id: string;
  title: string;
  description: string;
  category: 'Core' | 'Agentic' | 'File Ops' | 'Terminal' | 'Config' | 'Advanced' | 'AI';
  command?: string;
  details: string;
  useCases?: string[];
  proTip?: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  guideMarkdown?: string;
  tutorialSteps?: {
    step: string;
    description: string;
    command?: string;
  }[];
  subCommands?: {
    command: string;
    description: string;
  }[];
  checkPoints?: string[];
}

export const features: Feature[] = [
  {
    id: 'slash-commands',
    title: 'Slash Commands',
    description: 'Special commands that start with / to control your session, context, and environment.',
    category: 'Core',
    command: '/',
    details: 'Slash commands are the primary way to interact with Claude’s internal tools. They allow you to manage the context window, control execution, and configure settings without leaving the chat interface.',
    difficulty: 'Beginner',
    useCases: ['Context management', 'Session reset', 'Configuration editing', 'Bug reporting'],
    proTip: 'Type / and use the arrow keys to quickly cycle through available commands with auto-completion.',
    subCommands: [
      { command: '/help', description: 'Show the help menu with all available commands.' },
      { command: '/compact', description: 'Compact conversation history to save context space.' },
      { command: '/clear', description: 'Clear the current session and start a fresh conversation.' },
      { command: '/memory', description: 'View or edit CLAUDE.md memory files for project context.' },
      { command: '/review', description: 'Analyze recent code changes for quality and bugs.' },
      { command: '/init', description: 'Initialize a new project with CLAUDE.md memory files.' },
      { command: '/cost', description: 'Show estimated token usage and session costs.' },
      { command: '/doctor', description: 'Run health checks on your Claude Code installation.' },
      { command: '/login', description: 'Switch Anthropic accounts or re-authenticate.' },
      { command: '/status', description: 'Show the current git status of your workspace.' },
      { command: '/model', description: 'Switch between different Claude models (e.g., Sonnet 3.5, Opus).' },
      { command: '/permissions', description: 'View or manage tool execution permissions.' },
      { command: '/allowed-tools', description: 'Define tools that can always run without confirmation.' },
      { command: '/config', description: 'Open the interactive configuration menu.' },
      { command: '/diff', description: 'Show uncommitted changes in the current context.' },
      { command: '/context', description: 'Show detailed context window usage and limits.' },
      { command: '/branch', description: 'Split the current conversation into a parallel exploration.' },
      { command: '/rewind', description: 'Go back to a previous point in the conversation.' },
      { command: '/resume', description: 'Pick up a previously saved or crashed session.' },
      { command: '/rename', description: 'Give the current session a descriptive name.' },
      { command: '/export', description: 'Save the current session history to a file.' },
      { command: '/effort', description: 'Set reasoning depth: low, medium, high, or max.' },
      { command: '/plan', description: 'Enter planning mode for complex multi-step tasks.' },
      { command: '/btw', description: 'Ask a side question without adding to context history.' },
      { command: '/batch', description: 'Split work across multiple parallel agents.' },
      { command: '/loop', description: 'Schedule a task to run on a recurring interval.' },
      { command: '/schedule', description: 'Create a cloud-backed scheduled maintenance task.' },
      { command: '/debug', description: 'Toggle verbose logging mode for troubleshooting.' },
      { command: '/simplify', description: 'Review recent changes to propose cleaner refactors.' },
      { command: '/agents', description: 'Manage and define custom sub-agent personas.' },
      { command: '/mcp', description: 'Show and manage active MCP (Model Context Protocol) connections.' },
      { command: '/plugin', description: 'Install, list, or remove Claude Code plugins.' },
      { command: '/sandbox', description: 'Enable secure OS-level isolation for execution.' }
    ],
    tutorialSteps: [
      {
        step: 'Trigger the Menu',
        description: 'Simply type a forward slash in the terminal to see the interactive menu.',
        command: '/'
      },
      {
        step: 'Navigate',
        description: 'Use your arrow keys or continue typing to filter the commands.'
      },
      {
        step: 'Execute',
        description: 'Press Enter to select and trigger the command with Claude.',
        command: '/edit package.json'
      }
    ],
    checkPoints: [
      'Slash commands are prefixed with /',
      'They can be triggered within or outside of agentic sessions',
      'Use /reset to clear context and start fresh',
      'The menu supports full fuzzy-search auto-completion'
    ]
  },
  {
    id: 'edit-file',
    title: 'Smart File Editing',
    description: 'Precise line-by-line or block-based file modifications.',
    category: 'File Ops',
    command: '/edit',
    details: 'Claude can modify specific parts of a file without rewriting the whole thing, maintaining context and style.',
    difficulty: 'Beginner',
    useCases: ['Small bug fixes', 'Changing variable names', 'Updating documentation'],
    proTip: 'Use /edit followed by a specific instruction for the fastest results.',
    tutorialSteps: [
      {
        step: 'Specify the target',
        description: 'Use the /edit command followed by the filename you want to modify.',
        command: '/edit src/App.tsx'
      },
      {
        step: 'Provide instructions',
        description: 'Tell Claude what to change. Be specific: "Change the primary brand color from blue to indigo".'
      },
      {
        step: 'Verify the diff',
        description: 'Claude will show you a "diff" (differences) of the proposed changes. If it looks correct, confirm with "y".'
      }
    ]
  },
  {
    id: 'bash-execution',
    title: 'Bash Command Execution',
    description: 'Run terminal commands directly through Claude.',
    category: 'Terminal',
    details: 'Claude can execute shell commands to run tests, build projects, or explore the file system.',
    difficulty: 'Beginner',
    useCases: ['Running npm scripts', 'Git operations', 'System interrogation'],
    proTip: 'Claude will ask for confirmation before running potentially destructive commands.'
  },
  {
    id: 'git-integration',
    title: 'Git Integration',
    description: 'Commit, branch, and push directly from the CLI.',
    category: 'Core',
    command: '/commit',
    details: 'Full support for git operations, including generating meaningful commit messages based on changes.',
    difficulty: 'Beginner'
  },
  {
    id: 'interactive-terminal',
    title: 'Interactive TUI',
    description: 'A rich terminal user interface for better feedback.',
    category: 'Terminal',
    details: 'Real-time progress bars, diff visualizations, and interactive confirmation prompts.',
    difficulty: 'Beginner'
  },
  {
    id: 'llm-basics',
    title: 'Large Language Models (LLMs)',
    description: 'The core technology powering Claude\'s intelligence.',
    category: 'AI',
    details: 'LLMs are massive neural networks trained on vast amounts of text to understand and generate human-like language, code, and reasoning.',
    difficulty: 'Beginner'
  },
  {
    id: 'generative-ai',
    title: 'Generative AI',
    description: 'AI that creates new content rather than just analyzing existing data.',
    category: 'AI',
    details: 'Claude Code represents the frontier of Generative AI for software engineering, capable of generating whole features from natural language.',
    difficulty: 'Beginner'
  },
  {
    id: 'agentic-reasoning',
    title: 'Agentic Reasoning',
    description: 'Claude can reason about complex tasks and execute them autonomously.',
    category: 'Agentic',
    details: 'Claude analyzes the request, plans the steps, and uses available tools to complete the task, explaining its process along the way.',
    difficulty: 'Intermediate',
    useCases: ['Complex bug fixing', 'Feature implementation', 'Codebase exploration'],
    proTip: 'Give Claude a high-level goal and let it plan the sub-tasks for better results.',
    tutorialSteps: [
      {
        step: 'Initialize Claude',
        description: 'Start by running the basic claude command to enter the agentic session.',
        command: 'claude'
      },
      {
        step: 'Define your goal',
        description: 'Tell Claude what you want to achieve in natural language. For example: "Implement a dark mode toggle for the home page".'
      },
      {
        step: 'Review the plan',
        description: 'Claude will analyze your project and propose a step-by-step plan. Read it carefully before confirming.'
      },
      {
        step: 'Watch the execution',
        description: 'Claude will start editing files, running tests, and updating the UI autonomously. You can pause at any time.'
      }
    ]
  },
  {
    id: 'context-management',
    title: 'Dynamic Context Management',
    description: 'Automatically pulls relevant files into context.',
    category: 'Core',
    details: 'Claude intelligently selects which files are necessary for the current task, minimizing noise and maximizing efficiency.',
    difficulty: 'Intermediate',
    useCases: ['Large refactoring', 'Learning a new codebase', 'Debugging cross-file issues']
  },
  {
    id: 'test-generation',
    title: 'Unit Test Generation',
    description: 'Create comprehensive test suites for your code.',
    category: 'Advanced',
    details: 'Claude analyzes your functions and edge cases to generate robust unit tests in your preferred framework.',
    difficulty: 'Intermediate'
  },
  {
    id: 'dependency-analysis',
    title: 'Dependency Analysis',
    description: 'Understand and manage project dependencies.',
    category: 'Core',
    details: 'Check for missing or unused packages and optimize your package-lock.json with intelligent suggestions.',
    difficulty: 'Intermediate'
  },
  {
    id: 'mcp-concept',
    title: 'Model Context Protocol (MCP)',
    description: 'The open standard for connecting AI models to data sources.',
    category: 'AI',
    details: 'MCP allows Claude Code to securely connect to external tools, databases, and local files using a standardized communication protocol.',
    difficulty: 'Intermediate'
  },
  {
    id: 'ai-agents',
    title: 'Autonomous Agents',
    description: 'AI entities capable of planning and executing tasks independently.',
    category: 'AI',
    details: 'An agent doesn\'t just answer questions; it uses tools (like bash or file editing) to achieve a defined goal through iterative reasoning.',
    difficulty: 'Intermediate'
  },
  {
    id: 'context-window',
    title: 'Context Window',
    description: 'The "short-term memory" limit of an AI model.',
    category: 'AI',
    details: 'Claude features a massive context window, allowing it to "read" and reason across hundreds of files simultaneously to understand deep relationships.',
    difficulty: 'Intermediate'
  },
  {
    id: 'config-customization',
    title: 'Configuration Customization',
    description: 'Tailor Claude Code to your specific workflow.',
    category: 'Config',
    details: 'Support for .claudecode.json and environment variables to define custom behaviors and tool limits.',
    difficulty: 'Advanced'
  },
  {
    id: 'bug-hunting',
    title: 'Autonomous Bug Hunting',
    description: 'Search for and fix bugs across multiple files.',
    category: 'Agentic',
    details: 'Claude can run tests, look for failures, and trace the root cause across your entire repository.',
    difficulty: 'Advanced'
  },
  {
    id: 'multi-file-refactor',
    title: 'Multi-file Refactoring',
    description: 'Apply large-scale changes safely across the codebase.',
    category: 'Advanced',
    details: 'Specify a refactoring pattern, and Claude will propagate the changes while ensuring no regressions are introduced.',
    difficulty: 'Advanced'
  },
  {
    id: 'security-audit',
    title: 'Local Security Audit',
    description: 'Scan your code for sensitive data or vulnerabilities.',
    category: 'Advanced',
    details: 'Identifies hardcoded keys, insecure patterns, and potential data leaks before you commit.',
    difficulty: 'Advanced'
  }
];
