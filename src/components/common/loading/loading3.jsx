export const Loading3 = ({ loadingText }) => {
  return (
    <div className="w-full flex flex-col justify-center items-center">
      <span className="loading loading-bars bg-primary loading-lg"></span>
      <h3
        style={{ letterSpacing: "4px" }}
        className="text-primary z-10 uppercase text-xs"
      >
        {loadingText}
      </h3>
    </div>
  );
};
