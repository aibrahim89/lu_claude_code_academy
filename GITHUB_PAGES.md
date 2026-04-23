# How to Deploy to GitHub Pages

I have prepared this project for easy deployment to GitHub Pages. Follow these steps after you export the code to your computer or GitHub.

## Prerequisites

1.  **Initialize a Git repository** (if not already done):
    ```bash
    git init
    git add .
    git commit -m "Initial commit"
    ```
2.  **Create a new repository on GitHub** named `claude-code-academy`.
3.  **Link your local repo to GitHub**:
    ```bash
    git remote add origin https://github.com/YOUR_USERNAME/claude-code-academy.git
    git branch -M main
    git push -u origin main
    ```

## Configuration

In `.env` (create it if it doesn't exist), ensure you have:
```env
VITE_BASE_PATH=/claude-code-academy/
```
*Note: Replace `claude-code-academy` with your actual repository name if it's different. This is crucial because GitHub Pages serves project sites from subfolders (e.g., `username.github.io/repo-name/`).*

## Deployment Command

Once configured, simply run:
```bash
npm run deploy
```

This command will:
1.  Build the project (`npm run build`).
2.  Push the contents of the `dist/` folder to a `gh-pages` branch on your GitHub repository using the `gh-pages` internal package I installed for you.

## GitHub Pages Settings

1.  Go to your repository on GitHub.
2.  Navigate to **Settings** > **Pages**.
3.  Under **Build and deployment** > **Branch**, ensure the source is set to `Deploy from a branch`.
4.  Select the `gh-pages` branch and the `/ (root)` folder.
5.  Save the settings.

Your app should be live at `https://YOUR_USERNAME.github.io/claude-code-academy/` within a few minutes!
