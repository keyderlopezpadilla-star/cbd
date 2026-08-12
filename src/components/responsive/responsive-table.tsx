'use client'

import { cn } from '@/lib/utils'

export interface TableColumn<T> {
  key: keyof T
  label: string
  render?: (value: T[keyof T], row: T) => React.ReactNode
  className?: string
  hideOnMobile?: boolean
}

interface ResponsiveTableProps<T> {
  data: T[]
  columns: TableColumn<T>[]
  className?: string
  emptyMessage?: string
  onRowClick?: (row: T) => void
}

export function ResponsiveTable<T extends Record<string, unknown>>({
  data,
  columns,
  className,
  emptyMessage = 'No hay datos disponibles',
  onRowClick,
}: ResponsiveTableProps<T>) {
  if (data.length === 0) {
    return (
      <div className={cn('text-center py-12 text-cbd-gray-light', className)}>
        <p>{emptyMessage}</p>
      </div>
    )
  }

  return (
    <div className={className}>
      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/10">
              {columns.map((col) => (
                <th
                  key={String(col.key)}
                  className={cn(
                    'text-left px-4 py-3 text-xs font-semibold uppercase tracking-wider text-cbd-gray-light',
                    col.className
                  )}
                >
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                onClick={() => onRowClick?.(row)}
                className={cn(
                  'border-b border-white/5 transition-colors',
                  onRowClick && 'cursor-pointer hover:bg-white/5'
                )}
              >
                {columns.map((col) => (
                  <td
                    key={String(col.key)}
                    className={cn('px-4 py-3 text-sm text-white', col.className)}
                  >
                    {col.render
                      ? col.render(row[col.key], row)
                      : String(row[col.key] ?? '')}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card Layout */}
      <div className="md:hidden space-y-3">
        {data.map((row, rowIndex) => (
          <div
            key={rowIndex}
            onClick={() => onRowClick?.(row)}
            className={cn(
              'rounded-xl border border-white/10 bg-cbd-dark p-4 space-y-2',
              onRowClick && 'cursor-pointer active:bg-white/5'
            )}
          >
            {columns
              .filter((col) => !col.hideOnMobile)
              .map((col) => (
                <div
                  key={String(col.key)}
                  className="flex items-start justify-between gap-2"
                >
                  <span className="text-xs font-medium text-cbd-gray-light uppercase tracking-wide flex-shrink-0">
                    {col.label}
                  </span>
                  <span className="text-sm text-white text-right">
                    {col.render
                      ? col.render(row[col.key], row)
                      : String(row[col.key] ?? '')}
                  </span>
                </div>
              ))}
          </div>
        ))}
      </div>
    </div>
  )
}
