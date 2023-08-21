const Header = (props) => {
  const { title, actions } = props;
  return (
    <>
      <div className="flex justify-between w-full mb-5">
        <span className="text-2xl">{title}</span>
        <div>{actions}</div>
      </div>
    </>
  );
};

export default Header;
