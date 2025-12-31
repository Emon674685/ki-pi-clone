import kpiLogo from "@/assets/kpi-logo.jpg";

const Header = () => {
  return (
    <header className="w-full py-3 sm:py-6 px-3 sm:px-4">
      <div className="container mx-auto flex items-center justify-center gap-2 sm:gap-4">
        <img
          src={kpiLogo}
          alt="KPI Logo"
          className="w-10 h-10 sm:w-14 sm:h-14 rounded-full border-2 border-gold object-cover shadow-lg"
        />
        <h1 className="text-base sm:text-xl md:text-2xl font-display font-semibold text-gold tracking-wide">
          Kishoreganj Polytechnic Institute
        </h1>
      </div>
    </header>
  );
};

export default Header;
