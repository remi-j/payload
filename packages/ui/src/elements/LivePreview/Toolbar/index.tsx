'use client'
import type { EditViewProps } from 'payload'

import { useDraggable } from '@dnd-kit/core'
import React from 'react'

import { DragHandleIcon } from '../../../icons/DragHandle/index.js'
import { useLivePreviewContext } from '../../../providers/LivePreview/context.js'
import { ToolbarControls } from './Controls/index.js'
import './index.scss'

const baseClass = 'live-preview-toolbar'

const DraggableToolbar: React.FC<EditViewProps> = (props) => {
  const { toolbarPosition } = useLivePreviewContext()

  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: 'live-preview-toolbar',
  })

  return (
    <div
      className={[baseClass, `${baseClass}--draggable`].join(' ')}
      style={{
        left: `${toolbarPosition.x}px`,
        top: `${toolbarPosition.y}px`,
        ...(transform
          ? {
              transform: transform
                ? `translate3d(${transform?.x || 0}px, ${transform?.y || 0}px, 0)`
                : undefined,
            }
          : {}),
      }}
    >
      <button
        {...listeners}
        {...attributes}
        className={`${baseClass}__drag-handle`}
        ref={setNodeRef}
        type="button"
      >
        <DragHandleIcon />
      </button>
      <ToolbarControls {...props} />
    </div>
  )
}

const StaticToolbar: React.FC<EditViewProps> = (props) => {
  return (
    <div className={[baseClass, `${baseClass}--static`].join(' ')}>
      <ToolbarControls {...props} />
    </div>
  )
}

export const LivePreviewToolbar: React.FC<
  {
    draggable?: boolean
  } & EditViewProps
> = (props) => {
  const { draggable } = props

  if (draggable) {
    return <DraggableToolbar {...props} />
  }

  return <StaticToolbar {...props} />
}
