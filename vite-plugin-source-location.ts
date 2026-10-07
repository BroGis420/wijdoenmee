import type { Plugin } from 'vite'

export default function sourceLocationPlugin(): Plugin {
  return {
    name: 'vite-plugin-source-location',
  }
}
