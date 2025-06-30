export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:9090';

// Markdown渲染组件的样式配置
export const MARKDOWN_STYLES = {
  container: "text-xl text-gray-700 leading-9",
  h1: "text-3xl font-bold mb-5 text-gray-800",
  h2: "text-2xl font-semibold mb-4 text-gray-800", 
  h3: "text-xl font-medium mb-3 text-gray-800",
  p: "mb-5 text-xl text-gray-700",
  ul: "list-disc list-inside mb-5 text-xl text-gray-700",
  ol: "list-decimal list-inside mb-5 text-xl text-gray-700",
  li: "mb-3 text-xl",
  strong: "font-semibold text-xl text-gray-800",
  em: "italic text-xl text-gray-600",
  code: "bg-gray-100 px-3 py-2 rounded text-lg font-mono",
  blockquote: "border-l-4 border-blue-300 pl-5 py-4 mb-5 bg-blue-50 italic text-xl"
};