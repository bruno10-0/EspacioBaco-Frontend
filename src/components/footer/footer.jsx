import { FaInstagram,FaWhatsapp,FaFacebookF   } from "react-icons/fa6";
export const Footer = () => {
    return (
        <>
            <footer className="footer footer-center p-5 mt-56 bg-base-100 text-base-content rounded">
                <nav className="grid grid-flow-col gap-4">
                    <a className="link link-hover">About us</a>
                    <a className="link link-hover">Contact</a>
                    <a className="link link-hover">Products</a>
                </nav>
                <nav>
                    <div className="grid grid-flow-col gap-4">
                    <FaInstagram className="text-2xl cursor-pointer"/>
                    <FaWhatsapp className="text-2xl cursor-pointer"/>
                    <FaFacebookF className="text-2xl cursor-pointer"/>
                    </div>
                </nav>
                <aside>
                    <p className="select-none">Copyright © 2024 - All right reserved by WinesEli Industries</p>
                </aside>
            </footer>
        </>
    )
}
