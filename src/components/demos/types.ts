export interface Message {
  role: "user" | "assistant";
  content: string;
  timestamp: string;
}

export function formatContent(content: string) {
  return content
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    .replace(/\n\n/g, "<br/><br/>")
    .replace(/\n/g, "<br/>");
}
