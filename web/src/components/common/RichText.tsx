'use client'

import { cn } from '@/lib/utils'
import dynamic from 'next/dynamic'
import { forwardRef } from 'react'
import { EditorProps } from 'react-draft-wysiwyg'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'

const Editor = dynamic(() => import('react-draft-wysiwyg').then((mod) => mod.Editor), {
  ssr: false,
})

export default forwardRef<Object, EditorProps>(function RichTextEditor(props, ref) {
  return (
    <Editor
      spellCheck
      editorClassName={cn(
        'min-h-[200px] cursor-text rounded-md border bg-background px-4 ring-offset-border focus-within:ring-1 focus-within:ring-ring focus-within:ring-offset-2',
        props.editorClassName,
      )}
      toolbar={{
        options: ['inline', 'list', 'link', 'history'],
        inline: {
          options: ['bold', 'italic', 'underline'],
        },
      }}
      editorRef={(r) => {
        if (typeof ref === 'function') {
          ref(r)
        } else if (ref) {
          ref.current = r
        }
      }}
      {...props}
    />
  )
})
