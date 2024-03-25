/* eslint-disable react/prop-types */
import { useState } from "react";
import { FaCaretLeft, FaCaretRight } from "react-icons/fa";
export const Pagination = ({ pagina, setPagina, maximo }) => {
    const [input, setInput] = useState(1)

    const prevPage = () => {
        setInput(parseInt(input) - 1)
        setPagina(parseInt(input) - 1)
    }
    const nextPage = () => {
        setInput(parseInt(input) + 1)
        setPagina(parseInt(input) + 1)
    }
    const oneKeyDown = (e) => {
        if (e.keyCode == 13) {
            setPagina(parseInt(e.target.value))
            if (
                parseInt(e.target.value) < 1 ||
                parseInt(e.target.value) > Math.ceil(maximo) ||
                isNaN(parseInt(e.target.value))) {
                setPagina(1);
                setInput(1);
            } else {
                setPagina(parseInt(e.target.value))
            }
        }
    }
    const onChange = (e) => {
        setInput(e.target.value);
    }
    return (
        <div className="flex items-center justify-center gap-4 p-2">
            <button
                onClick={prevPage}
                disabled={pagina === 1 || pagina < 1}
                className="disabled:hidden text-secondary"
            >
                <FaCaretLeft className="text-2xl" />
            </button>

            <input
                onChange={e => onChange(e)}
                onKeyDown={e => oneKeyDown(e)}
                name="page" autoComplete="off"
                value={input}
                className="text-secondary bg-transparent border-secondary border rounded-badge w-12 text-center px-1"
                type="text" />
            <p className="flex">de <span className="mx-2">{Math.ceil(maximo)}</span></p>
            <button
                onClick={nextPage}
                disabled={pagina === Math.ceil(maximo) || pagina > maximo}
                className="disabled:hidden text-secondary"
            >
                <FaCaretRight className="text-secondary text-2xl" />
            </button>
        </div>

    )
}
