import "./aboutSection.css";
import img from "./../../assets/manchaDvino-removebg-preview.png";
import img2 from "./../../assets/copaDavinoR.png";

export const AboutSection = () => {
  return (
    <section className="about" style={{ marginTop: "70px" }}>
      <div className="md:flex gap-2">
        <div className="text-box md:w-8/12 lg:w-1/2">
          <h1 className="animation">Dream drops</h1>
          <h1 className="animation text-primary">Drink, Refresh, Repeat</h1>
          <p className="animation">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque
            voluptas porro, at quod aliquam nisi esse aut officiis ratione.
            Deserunt commodi asperiores culpa eaque doloremque doloribus libero
            alias illum accusamus!
          </p>
          <button
            type="button"
            className="btn text-primary border border-primary glass"
          >
            Search now
          </button>
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
