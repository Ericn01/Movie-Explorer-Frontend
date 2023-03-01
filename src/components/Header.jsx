const Header = () => {
    return (
        <section id="header" className="flex justify-between items-center px-10 py-4">
            <div className="flex items-center">
                <img src="public/assets/images/logo.png" width={"75px"} alt="Movie"/>
                <h3 className="ml-4 font-bold text-xl tracking-tight"> Discover All of Your Favorite Movies! </h3>
            </div>
            <button className="w-[100px]  text-white flex justify-center p-2 border-2 rounded-lg shadow text-md tracking-tight font-semibold bg-orange-500 hover:bg-orange-700"> About </button>
        </section>
    );
}

export default Header;