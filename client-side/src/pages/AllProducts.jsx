import React from 'react'
import { useAppContext } from '../context/AppContext'
import ClothesCard from '../reuseable/clothesCard'

const AllProducts = () => {
  const { clothes } = useAppContext()

  return (
    <section className="min-h-screen px-6 md:px-16 lg:px-24 xl:px-32 py-10">
      
      {/* Page Header */}
      <div className="my-10 text-center">
        <h1 className="text-3xl sm:text-4xl font-bold text-primary">
          All Products
        </h1>
        <p className="mt-2 text-gray-600 max-w-xl mx-auto">
          Discover premium clothing crafted for comfort and style.
        </p>
      </div>

      {/* Products Grid */}
      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {clothes.map(item => (
          <ClothesCard key={item._id} item={item} />
        ))}
      </div>

    </section>
  )
}

export default AllProducts
