import { NavBar } from "../components/navBar/navBar"
import { SliderAuto } from "../components/sliderAuto/sliderAuto"
export const Home = () => {
    const carouselItems = [
        { imageUrlLarge: 'https://www.solyvinomendoza.com/img/cms/Blend%20Tintos_Web%20pc.jpg',imageUrlSmall:"https://www.solyvinomendoza.com/img/cms/Blend%20Tintos_Web%20Mobil.jpg", altText: 'VinoMalbec' },
        { imageUrlLarge: 'https://www.solyvinomendoza.com/img/cms/Promos%20Carnaval_Web%20pc.jpg',imageUrlSmall:"https://www.solyvinomendoza.com/img/cms/Promos%20Carnaval_Web%20Mobil.jpg", altText: 'PromoCarnaval' },
        { imageUrlLarge: 'https://www.solyvinomendoza.com/img/cms/Malbec%2010off_Web%20pc.jpg',imageUrlSmall:"https://www.solyvinomendoza.com/img/cms/Malbec%2010off_Web%20Mobil.jpg", altText: 'Blend' },
    ];
    return (
        <div>
            <NavBar />
            <div>
                <SliderAuto items={carouselItems} />
            </div>

        </div>
    )
}
