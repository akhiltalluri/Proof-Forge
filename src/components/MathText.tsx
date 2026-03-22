"use client";

import ReactMarkdown from "react-markdown";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";

interface MathTextProps {
  children: string;
  className?: string;
}

export default function MathText({ children, className = "" }: MathTextProps) {
  return (
    <div className={`math-content ${className}`}>
      <ReactMarkdown remarkPlugins={[remarkMath]} rehypePlugins={[rehypeKatex]}>
        {children}
      </ReactMarkdown>
    </div>
  );
}
