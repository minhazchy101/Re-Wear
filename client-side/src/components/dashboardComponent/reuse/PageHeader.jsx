import React from 'react'

const PageHeader = ({title, subtitle, items, tag}) => {
  return (
   <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            {title}
          </h1>
          <p className="text-gray-500 mt-1">
            {subtitle}
          </p>
        </div>

        <span className="inline-flex items-center px-4 py-2 rounded-full bg-primary-dull text-white text-sm font-medium w-fit">
          {items.length} clothes {tag}
        </span>
      </div>
  )
}

export default PageHeader
