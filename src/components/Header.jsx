const Header = () => {
    return (
        <section id="header" className="flex justify-between items-center">
            <img src="src/assets/logo.png" width={"75px"} alt="Movie"/>
            <button className="w-[100px]  text-white font-medium flex justify-center p-2 border-2 border-black rounded-md shadow-sm text-md font-semibold bg-violet-500 hover:bg-violet-700"> About </button>
        </section>
    )
}
export default Header;