const SearchComponent = ({search, handleSearch}) => {
    return (
        <>
         <form class="w-full max-w-sm" onSubmit={(e) => {e.preventDefault()}}>
            <div class="flex items-center border-b border-teal-500 py-2">
                <input value={search} onChange={handleSearch} class="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none" type="text" placeholder="Jane Doe" aria-label="Full name" />
            </div>
         </form>
        </>
    )
}

export default SearchComponent;