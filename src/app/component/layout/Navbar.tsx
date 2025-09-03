import { NavbarTitle, NavbarWrapper } from "../StyledComponent";

export default function Navbar() {
  return (
    <NavbarWrapper>
      <div className="px-6 flex justify-between items-center">
        <NavbarTitle>📚 Perpustakaan Digital</NavbarTitle>
      </div>
    </NavbarWrapper>
  );
}
