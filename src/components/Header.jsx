import logo from "../assets/logo_3DMPviewer.svg";
import controllermouse from "../assets/controllers_mouse.svg";
import controllerhand from "../assets/controllers_hand.svg";

export default function Header() {
  return (
    <header className="flex flex-col md:flex-row justify-between items-center gap-3.75 bg-[#ECEDEF] text-white p-2 border-b-1 border-[#FFFFFF] shadow-md ">
      <img src={logo} alt="MP Logo" className="h-12" />
      <img src={controllermouse} alt="controller mouse" className="h-12 hidden md:block" />
      <img src={controllerhand} alt="controller hand" className="h-12 block md:hidden" />
    </header>
  );
}
