import React, { useState, useRef, useEffect } from 'react';
import Editor, { Monaco } from '@monaco-editor/react';
import {
  Code2,
  Play,
  Layout,
  Save,
  Download,
  Copy,
  RefreshCw,
} from 'lucide-react';

type Language =
  | 'javascript'
  | 'typescript'
  | 'html'
  | 'css'
  | 'react'
  | 'vue'
  | 'angular';

interface Template {
  files: {
    [key: string]: string;
  };
  mainFile: string;
}

const templates: Record<Language, Template> = {
  javascript: {
    files: {
      'index.js': `// JavaScript Example
console.log('Hello, World!');

// Create a simple counter
let count = 0;
function increment() {
  count++;
  console.log('Count:', count);
}

// Call the function
increment();`,
    },
    mainFile: 'index.js',
  },
  typescript: {
    files: {
      'index.ts': `// TypeScript Example
interface Person {
  name: string;
  age: number;
}

function greet(person: Person): string {
  return \`Hello, \${person.name}! You are \${person.age} years old.\`;
}

const person: Person = {
  name: 'John',
  age: 30
};

console.log(greet(person));`,
    },
    mainFile: 'index.ts',
  },
  html: {
    files: {
      'index.html': `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>HTML Example</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      margin: 0;
      background-color: #f0f0f0;
    }
    .container {
      text-align: center;
      padding: 2rem;
      background-color: white;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    button {
      padding: 0.5rem 1rem;
      background-color: #4f46e5;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }
    button:hover {
      background-color: #4338ca;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>Hello, World!</h1>
    <p>This is a simple HTML example.</p>
    <button onclick="alert('Button clicked!')">Click me</button>
  </div>
</body>
</html>`,
    },
    mainFile: 'index.html',
  },
  css: {
    files: {
      'index.html': `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>CSS Example</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <div class="card">
    <h2>CSS Card Example</h2>
    <p>Hover over this card to see the animation effect!</p>
    <button>Learn More</button>
  </div>
</body>
</html>`,
      'styles.css': `body {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  margin: 0;
  background-color: #f0f0f0;
  font-family: Arial, sans-serif;
}

.card {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  transition: transform 0.3s ease;
  text-align: center;
}

.card:hover {
  transform: translateY(-5px);
}

button {
  background: #4f46e5;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button:hover {
  background: #4338ca;
}`,
    },
    mainFile: 'styles.css',
  },
  react: {
    files: {
      'App.jsx': `import React, { useState } from 'react';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md text-center">
        <h1 className="text-2xl font-bold mb-4">React Counter</h1>
        <p className="text-4xl font-bold text-indigo-600 mb-4">{count}</p>
        <button
          onClick={() => setCount(count + 1)}
          className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
        >
          Increment
        </button>
      </div>
    </div>
  );
}

export default App;`,
    },
    mainFile: 'App.jsx',
  },
  vue: {
    files: {
      'App.vue': `<template>
  <div class="min-h-screen bg-gray-100 flex items-center justify-center">
    <div class="bg-white p-8 rounded-lg shadow-md text-center">
      <h1 class="text-2xl font-bold mb-4">Vue Counter</h1>
      <p class="text-4xl font-bold text-indigo-600 mb-4">{{ count }}</p>
      <button
        @click="increment"
        class="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
      >
        Increment
      </button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      count: 0
    }
  },
  methods: {
    increment() {
      this.count++
    }
  }
}
</script>`,
    },
    mainFile: 'App.vue',
  },
  angular: {
    files: {
      'app.component.ts': `import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: \`
    <div class="min-h-screen bg-gray-100 flex items-center justify-center">
      <div class="bg-white p-8 rounded-lg shadow-md text-center">
        <h1 class="text-2xl font-bold mb-4">Angular Counter</h1>
        <p class="text-4xl font-bold text-indigo-600 mb-4">{{ count }}</p>
        <button
          (click)="increment()"
          class="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
        >
          Increment
        </button>
      </div>
    </div>
  \`
})
export class AppComponent {
  count = 0;

  increment() {
    this.count++;
  }
}`,
    },
    mainFile: 'app.component.ts',
  },
};

export function CodeEditor() {
  const [language, setLanguage] = useState<Language>('javascript');
  const [files, setFiles] = useState(templates[language].files);
  const [activeFile, setActiveFile] = useState(templates[language].mainFile);
  const [showPreview, setShowPreview] = useState(true);
  const previewRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    setFiles(templates[language].files);
    setActiveFile(templates[language].mainFile);
  }, [language]);

  const handleEditorChange = (value: string | undefined) => {
    if (!value) return;
    setFiles((prev) => ({
      ...prev,
      [activeFile]: value,
    }));
  };

  const handleLanguageChange = (newLanguage: Language) => {
    setLanguage(newLanguage);
  };

  const runPreview = () => {
    if (!previewRef.current) return;

    const previewContent =
      language === 'html'
        ? files['index.html']
        : `<!DOCTYPE html>
<html>
<head>
  <style>${files['styles.css'] || ''}</style>
</head>
<body>
  <div id="root"></div>
  <script type="module">
    ${files[activeFile] || ''}
  </script>
</body>
</html>`;

    const blob = new Blob([previewContent], { type: 'text/html' });
    previewRef.current.src = URL.createObjectURL(blob);
  };

  const downloadCode = () => {
    const content = files[activeFile];
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = activeFile;
    a.click();
    URL.revokeObjectURL(url);
  };

  const copyCode = async () => {
    try {
      await navigator.clipboard.writeText(files[activeFile]);
    } catch (err) {
      console.error('Failed to copy code:', err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm">
          {/* Toolbar */}
          <div className="border-b dark:border-gray-700 p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="flex items-center">
                  <Code2 className="w-5 h-5 text-gray-500 dark:text-gray-400 mr-2" />
                  <select
                    value={language}
                    onChange={(e) =>
                      handleLanguageChange(e.target.value as Language)
                    }
                    className="block w-40 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
                  >
                    <option value="javascript">JavaScript</option>
                    <option value="typescript">TypeScript</option>
                    <option value="html">HTML</option>
                    <option value="css">CSS</option>
                    <option value="react">React</option>
                    <option value="vue">Vue</option>
                    <option value="angular">Angular</option>
                  </select>
                </div>
                {Object.keys(files).length > 1 && (
                  <select
                    value={activeFile}
                    onChange={(e) => setActiveFile(e.target.value)}
                    className="block w-40 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
                  >
                    {Object.keys(files).map((file) => (
                      <option key={file} value={file}>
                        {file}
                      </option>
                    ))}
                  </select>
                )}
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={copyCode}
                  className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                  title="Copy code"
                >
                  <Copy className="w-5 h-5" />
                </button>
                <button
                  onClick={downloadCode}
                  className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                  title="Download code"
                >
                  <Download className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setShowPreview(!showPreview)}
                  className={`p-2 ${showPreview ? 'text-indigo-600 dark:text-indigo-400' : 'text-gray-500 dark:text-gray-400'}`}
                  title="Toggle preview"
                >
                  <Layout className="w-5 h-5" />
                </button>
                <button onClick={runPreview} className="btn">
                  <Play className="w-4 h-4 mr-2" />
                  Run
                </button>
              </div>
            </div>
          </div>

          {/* Editor and Preview */}
          <div className="flex">
            <div className={`${showPreview ? 'w-1/2' : 'w-full'}`}>
              <Editor
                height="70vh"
                defaultLanguage={language}
                value={files[activeFile]}
                onChange={handleEditorChange}
                theme="vs-dark"
                options={{
                  minimap: { enabled: false },
                  fontSize: 14,
                  wordWrap: 'on',
                  lineNumbers: 'on',
                  automaticLayout: true,
                }}
              />
            </div>
            {showPreview && (
              <div className="w-1/2 border-l dark:border-gray-700">
                <div className="h-[70vh] bg-white dark:bg-gray-900">
                  <iframe
                    ref={previewRef}
                    title="Preview"
                    className="w-full h-full"
                    sandbox="allow-scripts allow-same-origin"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
