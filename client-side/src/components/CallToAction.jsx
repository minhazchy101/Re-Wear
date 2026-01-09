import React from 'react'
import { Link } from 'react-router-dom'

const CallToAction = () => {
  return (
     <>
            <section className="flex flex-col items-center justify-center section text-center rounded-2xl py-16 bg-light-bg">
                <h1 className="text-3xl md:text-6xl font-bold text-primary mb-4">
            Re<span className="text-gray-900">Wear</span>
          </h1>
                <h1 className="text-2xl md:text-3xl font-medium text-slate-900 max-w-2xl my-3">
                  Where Clothes Find New Owners.
                </h1>
                <p className="text-sm text-gray-500 max-w-lg">
                  Post your clothes with details, explore amazing pre-loved fashion, and reach out to sellers directly. Start sharing and finding your perfect items today, just simple!</p>
                <div className="flex gap-2 my-4">
                    <Link to={"/dashboard"} className="px-8 py-2 btn-primary">
                        Get Started
                    </Link>
                   
                </div>
            </section>
        </>
  )
}

export default CallToAction