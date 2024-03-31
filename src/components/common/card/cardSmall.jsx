export const CardSmall = ({ icono, color, titulo, subTitulo }) => {
  return (
    <div className={`${color} shadow-lg py-4 px-6 flex gap-4 w-auto rounded-badge select-none`}>
      <div className="text-3xl flex justify-center items-center text-base-100">
        {icono}
      </div>
      <div className="flex flex-col justify-center items-start">
        <h1 className="text-base-100 font-bold text-lg uppercase">{titulo}</h1>
        <h2 className="text-xs text-base-300">{subTitulo}</h2>
      </div>
    </div>
  );
};
