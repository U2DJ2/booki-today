function Header() {
  return (
    <header className="flex gap-5 justify-between px-10 py-6 w-full text-lg leading-7 text-center text-gray-500 max-md:flex-wrap max-md:px-5 max-md:max-w-full">
      <nav className="flex gap-5 justify-center my-auto font-semibold">
        <a href="#">대시보드</a>
        <a href="#">모임 생성</a>
      </nav>
      <div className="flex gap-5 justify-center font-bold whitespace-nowrap">
        <div className="justify-center my-auto">아주대학교</div>
        <img
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/c9e3048d2ecf88eda8221e80e1f3587f63212f6776bfaae61a153b6c70100a59?apiKey=d805a42ceca34cfc9ccedfe9a24c9a43&"
          alt="Profile"
          className="shrink-0 w-10 aspect-square"
        />
      </div>
    </header>
  );
}
export default Header;