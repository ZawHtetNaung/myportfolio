import React from 'react'
import { cva } from 'class-variance-authority'

import { cn } from '../../lib/utils'

const badgeVariants = cva(
  'inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-semibold transition-colors',
  {
    variants: {
      variant: {
        default: 'border-transparent bg-brand-600 text-white',
        secondary: 'border-slate-200 bg-slate-100 text-slate-700',
        outline: 'border-slate-300 text-slate-700 bg-white'
      }
    },
    defaultVariants: {
      variant: 'default'
    }
  }
)

function Badge({ className, variant, ...props }) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />
}

export { Badge, badgeVariants }
