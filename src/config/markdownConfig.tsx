import React from 'react';
import { MARKDOWN_STYLES } from './index';
import type { Components } from 'react-markdown';

// Markdown渲染组件的默认配置
export const MARKDOWN_COMPONENTS: Components = {
  h1: ({ children }: { children?: React.ReactNode }) => (
    <h1 className={MARKDOWN_STYLES.h1}>
      {children}
    </h1>
  ),
  h2: ({ children }: { children?: React.ReactNode }) => (
    <h2 className={MARKDOWN_STYLES.h2}>
      {children}
    </h2>
  ),
  h3: ({ children }: { children?: React.ReactNode }) => (
    <h3 className={MARKDOWN_STYLES.h3}>
      {children}
    </h3>
  ),
  p: ({ children }: { children?: React.ReactNode }) => (
    <p className={MARKDOWN_STYLES.p}>{children}</p>
  ),
  ul: ({ children }: { children?: React.ReactNode }) => (
    <ul className={MARKDOWN_STYLES.ul}>
      {children}
    </ul>
  ),
  ol: ({ children }: { children?: React.ReactNode }) => (
    <ol className={MARKDOWN_STYLES.ol}>
      {children}
    </ol>
  ),
  li: ({ children }: { children?: React.ReactNode }) => (
    <li className={MARKDOWN_STYLES.li}>{children}</li>
  ),
  strong: ({ children }: { children?: React.ReactNode }) => (
    <strong className={MARKDOWN_STYLES.strong}>
      {children}
    </strong>
  ),
  em: ({ children }: { children?: React.ReactNode }) => (
    <em className={MARKDOWN_STYLES.em}>{children}</em>
  ),
  code: ({ children }: { children?: React.ReactNode }) => (
    <code className={MARKDOWN_STYLES.code}>
      {children}
    </code>
  ),
  blockquote: ({ children }: { children?: React.ReactNode }) => (
    <blockquote className={MARKDOWN_STYLES.blockquote}>
      {children}
    </blockquote>
  ),
}; 