import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <div>
      <NavLink to="/plot">Plot</NavLink>
      <NavLink to="forecast">Forecast</NavLink>
    </div>
  );
}

export default Navbar;
