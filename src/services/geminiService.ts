import { GoogleGenAI, Type } from "@google/genai";
import { Feature } from "../data/features";
import { BlogPost } from "../data/blog";

const ai = new GoogleGenAI({ 
  apiKey: process.env.GEMINI_API_KEY || '' 
});

export async function fetchLatestClaudeFeatures(): Promise<Feature[]> {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: "Find the latest unique features and commands of Claude Code CLI (Anthropic's terminal AI) released in the last month or not yet widely documented. Return a list of at least 3-5 new features that are not 'Agentic Reasoning', 'File Editing', or 'Bash Execution'.",
      tools: [
        { googleSearch: {} }
      ],
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              id: { type: Type.STRING },
              title: { type: Type.STRING },
              description: { type: Type.STRING },
              category: { 
                type: Type.STRING, 
                enum: ['Core', 'Agentic', 'File Ops', 'Terminal', 'Config', 'Advanced', 'AI'] 
              },
              command: { type: Type.STRING },
              details: { type: Type.STRING },
              useCases: { 
                type: Type.ARRAY,
                items: { type: Type.STRING }
              },
              proTip: { type: Type.STRING },
              difficulty: {
                type: Type.STRING,
                enum: ['Beginner', 'Intermediate', 'Advanced']
              },
              guideMarkdown: { 
                type: Type.STRING,
                description: "A comprehensive markdown guide for this feature including examples, flags, and deep details."
              },
              tutorialSteps: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    step: { type: Type.STRING },
                    description: { type: Type.STRING },
                    command: { type: Type.STRING }
                  },
                  required: ['step', 'description']
                }
              }
            },
            required: ['id', 'title', 'description', 'category', 'details', 'difficulty']
          }
        }
      }
    } as any);

    if (response.text) {
      return JSON.parse(response.text);
    }
  } catch (error) {
    console.error("Error fetching latest features:", error);
  }
  return [];
}

export async function fetchLatestClaudeNews(): Promise<BlogPost[]> {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: "Find the latest official news, blog posts, or release updates about Claude Code (Anthropic's CLI tool) from the last few weeks. Provide a list of 2-3 news items.",
      tools: [
        { googleSearch: {} }
      ],
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              id: { type: Type.STRING },
              title: { type: Type.STRING },
              excerpt: { type: Type.STRING },
              content: { type: Type.STRING },
              date: { type: Type.STRING },
              author: { type: Type.STRING },
              tag: { 
                type: Type.STRING, 
                enum: ['Announcement', 'Tutorial', 'Tips'] 
              }
            },
            required: ['id', 'title', 'excerpt', 'content', 'date', 'author', 'tag']
          }
        }
      }
    } as any);

    if (response.text) {
      return JSON.parse(response.text);
    }
  } catch (error) {
    console.error("Error fetching latest news:", error);
  }
  return [];
}
