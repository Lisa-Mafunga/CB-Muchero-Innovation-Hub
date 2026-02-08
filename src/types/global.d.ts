declare module 'react';
declare module 'react-dom';
declare module 'react-router-dom';
declare module 'lucide-react';
declare module 'hono';
declare module 'hono/cors';
declare module 'hono/logger';
declare module 'react/jsx-runtime';
declare const Deno: any;
declare module '@/contexts/*';
declare module '@/app/components/*';
declare module '@/app/components/ui/*';
declare module '@/app/components/*';
declare module '*.css';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      [elemName: string]: any;
    }
  }
}

export {};
