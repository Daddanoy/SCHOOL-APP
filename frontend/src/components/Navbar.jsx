import  HomeButton  from "./HomeButton"

const Navbar = () => {
  return (
    <div className="flex justify-between bg-base-200 rounded-xl p-4 shadow-md" >
      <HomeButton/>
      <h1 className="text-4xl">TableDay</h1>
      {/* Tabools */}
      <p>.</p>
    </div>
  )
}

export default Navbar
