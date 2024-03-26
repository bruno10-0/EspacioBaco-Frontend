import "./aboutSection.css";

export const AboutSection = () => {
  return (
    <section className="about mt-16 md:mt-28">
      <div className="flex flex-col md:flex-row justify-around items-center gap-2 ">
        <div className="md:w-8/12 lg:w-1/2">
        <h1 style={{ letterSpacing: "2px" }} className="animation text-primary uppercase text-lg mb-2 w-full text-center">La Magia del Vino.</h1>
          <div className="animation flex flex-col gap-2 ">
            <span>
              Creemos que en el vasto universo de experiencias que nos regala la
              vida, hay algo mágico en la forma en que el vino teje sus
              historias entre las viñas y las barricas.
            </span>
            <span>
              Cada botella cuenta una narrativa única, una fusión de tierra, sol
              y cuidado meticuloso. Así como el amor transforma el alma y la
              vida nos brinda lecciones invaluables, el vino nos invita a
              sumergirnos en su complejidad, a deleitarnos con sus matices y a
              celebrar cada momento con intensidad. En cada copa, encontramos
              una oportunidad para conectar, para compartir, para celebrar la
              belleza efímera de la existencia. Como el buen vino, la vida es
              para ser saboreada con pasión y disfrutada en cada sorbo.
            </span>
            <div className="w-full flex justify-end my-2 text-primary">-EspacioBaco.</div>
          </div>
        </div>
        <div className="col-md-6">
          <img
            src="https://media-public.canva.com/CeEBM/MAEsmxCeEBM/1/tl.png"
            alt=""
            className="img-1"
          />
        </div>
      </div>
    </section>
  );
};
