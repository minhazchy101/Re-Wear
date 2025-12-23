import { FiInstagram, FiTwitter, FiGithub } from "react-icons/fi";

export default function Footer() {
  return (
    <footer className="bg-gray-50 text-gray-700">
      <div className="max-w-7xl mx-auto px-6 py-14 grid grid-cols-1 md:grid-cols-4 gap-10">
        
        {/* Brand */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-primary">
            Re<span className="text-gray-900">Wear</span>
          </h2>
          <p className="text-sm leading-relaxed text-gray-600">
            Give more. Waste less.  
            ReWear connects people to donate and receive unused clothes,
            helping reduce fashion waste and support communities.
          </p>
        </div>

        {/* Links */}
        <div>
          <h3 className="text-sm font-semibold text-gray-900 mb-4">Explore</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="/" className="hover:text-primary">Home</a></li>
            <li><a href="/products" className="hover:text-primary">Clothes</a></li>
            <li><a href="/about" className="hover:text-primary">About</a></li>
            <li><a href="/contact" className="hover:text-primary">Contact</a></li>
          </ul>
        </div>

        {/* Community */}
        <div>
          <h3 className="text-sm font-semibold text-gray-900 mb-4">Community</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-primary">Become a Giver</a></li>
            <li><a href="#" className="hover:text-primary">How it Works</a></li>
            <li><a href="#" className="hover:text-primary">Trust & Safety</a></li>
          </ul>
        </div>

        {/* Social */}
        <div>
          <h3 className="text-sm font-semibold text-gray-900 mb-4">Connect</h3>
          <div className="flex gap-4 text-xl text-gray-600">
            <a href="#" className="hover:text-primary"><FiInstagram /></a>
            <a href="#" className="hover:text-primary"><FiTwitter /></a>
            <a href="#" className="hover:text-primary"><FiGithub /></a>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between text-sm text-gray-500">
          <p>© {new Date().getFullYear()} ReWear. All rights reserved.</p>
          <p className="mt-2 md:mt-0">
            Built with for sustainability
          </p>
        </div>
      </div>
    </footer>
  );
}
