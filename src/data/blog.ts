export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  author: string;
  tag: 'Announcement' | 'Tutorial' | 'Tips';
}

export const blogPosts: BlogPost[] = [
  {
    id: 'intro-to-claude-code',
    title: 'Getting Started with Claude Code',
    excerpt: 'Learn how to install and set up Claude Code for your development workflow.',
    content: 'Claude Code is a revolutionary CLI tool... [Markdown content here]',
    date: '2025-03-20',
    author: 'Claude Academy Team',
    tag: 'Tutorial'
  },
  {
    id: 'v1-release',
    title: 'Claude Code v1.0 is Here!',
    excerpt: 'The official stable release brings new agentic capabilities and improved performance.',
    content: 'We are thrilled to announce... [Markdown content here]',
    date: '2025-03-15',
    author: 'Anthropic Engineering',
    tag: 'Announcement'
  }
];
