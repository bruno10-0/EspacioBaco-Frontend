export const Loading3 = ({ loadingText }) => {
  return (
    <div>
      <span className="loading loading-dots bg-primary loading-lg"></span>
      <h3
        style={{ letterSpacing: "4px" }}
        className="text-primary z-10 uppercase text-xs"
      >
        {loadingText}
      </h3>
    </div>
  );
};
