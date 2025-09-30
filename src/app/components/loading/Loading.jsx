import React from 'react'

export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-slate-900">
      <div className="text-center space-y-8">
        <div className="relative w-16 h-16 mx-auto">
          <div className="absolute inset-0 border-4 border-green-200 rounded-full"></div>
          <div className="absolute inset-2 border-4 border-green-500 rounded-full animate-spin border-t-transparent"></div>
          <div className="absolute inset-4 bg-green-500 rounded-full animate-pulse"></div>
        </div>
      </div>
    </div>
  )
}