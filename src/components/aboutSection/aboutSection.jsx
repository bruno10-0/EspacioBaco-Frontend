import "./aboutSection.css";
import img from "./../../assets/manchaDvino-removebg-preview.png";
import img2 from "./../../assets/copaDavinoR.png";

export const AboutSection = () => {
  return (
    <section className="about" style={{ marginTop: "70px" }}>
      <div className="md:flex gap-2">
        <div className="text-box md:w-8/12 lg:w-1/2">
          <h1 className="animation">WinesEli</h1>
          <h1 className="animation text-primary">
            Descubre el sabor de la vida en cada botella.
          </h1>
          <p className="animation">
            En el vasto universo de experiencias que nos regala la vida, hay
            algo mágico en la forma en que el vino teje sus historias entre las
            viñas y las barricas. Cada botella cuenta una narrativa única, una
            fusión de tierra, sol y cuidado meticuloso. Así como el amor
            transforma el alma y la vida nos brinda lecciones invaluables, el
            vino nos invita a sumergirnos en su complejidad, a deleitarnos con
            sus matices y a celebrar cada momento con intensidad. En cada copa,
            encontramos una oportunidad para conectar, para compartir, para
            celebrar la belleza efímera de la existencia. Como el buen vino, la
            vida es para ser saboreada con pasión y disfrutada en cada sorbo.
          </p>
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
