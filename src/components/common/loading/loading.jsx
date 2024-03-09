export const Loading = () => {
  return (
    <div>
      <div className="w-full h-full flex flex-col justify-center items-center gap-8">
        <span className="loading loading-bars loading-lg"></span>
        <h3>Cargando...</h3>
      </div>
    </div>
  );
};
