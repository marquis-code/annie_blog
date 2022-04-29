const Navbar = () => {
    return (   
        <nav className="border-b border-gray-300 bg-white py-3 border flex justify-between items-center max-w-7xl mx-auto px-16">
            <div className="cursor-pointer font-bold font-serif text-lg">Annie's Blog</div>
            <div className="flex space-x-14">
                <div className="uppercase text-sm font-semibold font-sans cursor-pointer hover:text-gray-300 hover:underline">Home</div>
                <div className="uppercase text-sm font-semibold font-sans cursor-pointer hover:text-gray-300 hover:underline">About</div>
                <div className="uppercase text-sm font-semibold font-sans cursor-pointer hover:text-gray-300 hover:underline">Posts</div>
                <div className="uppercase text-sm font-semibold font-sans cursor-pointer hover:text-gray-300 hover:underline">Contact</div>
            </div>
        </nav>
    )
}

export default Navbar;