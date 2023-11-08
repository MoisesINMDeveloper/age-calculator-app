import { useState } from 'react';
import ArrowPurple from "/icon-arrow.svg"

export default function AgeComponent() {
    const [day, setDay] = useState(null);
    const [month, setMonth] = useState(null);
    const [year, setYear] = useState(null);
    const [errors, setErrors] = useState({});
    const [result, setResult] = useState({
        years: null,
        months: null,
        days: null,
    });

    const validateInput = () => {
        const newErrors = {};

        // Validar campos vacíos
        if (!day) {
            newErrors.day = "This field is required";
        }
        if (!month) {
            newErrors.month = "This field is required";
        }
        if (!year) {
            newErrors.year = "This field is required";
        }

        const currentDate = new Date();
        const selectedDate = new Date(year, month - 1, day);

        // Validar que la fecha no sea en el futuro
        if (selectedDate > currentDate) {
            newErrors.date = "La fecha no puede estar en el futuro.";
        }

        // Validar que el año no sea en el futuro
        if (year > currentDate.getFullYear()) {
            newErrors.year = "Must be in the past";
        }

        // Validar que el día no supere la cantidad de días en el mes
        const daysInMonth = {
            1: 31, // Enero
            2: 28, // Febrero (sin tener en cuenta años bisiestos)
            3: 31, // Marzo
            4: 30, // Abril
            5: 31, // Mayo
            6: 30, // Junio
            7: 31, // Julio
            8: 31, // Agosto
            9: 30, // Septiembre
            10: 31, // Octubre
            11: 30, // Noviembre
            12: 31, // Diciembre
        };

        if (day > daysInMonth[month]) {
            newErrors.day = "Must be a valid day";
        }

        // Validar que el mes no sea mayor a 12
        if (month > 12) {
            newErrors.month = "Must be a valid month";
        }

        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            const ageDate = new Date(currentDate - selectedDate);
            const years = ageDate.getUTCFullYear() - 1970;
            const months = ageDate.getUTCMonth();
            const days = ageDate.getUTCDate() - 1;

            setResult({ years, months, days });
        } else {
            // Si hay errores, establece los resultados en nulo
            setResult({
                years: null,
                months: null,
                days: null,
            });
        }
    };

    const inputStyle = (fieldName) => {
        // Aplicar estilo rojo si hay un error en el campo
        return errors[fieldName] ? "inputstyle error-input outline-Purple md:w-[6.5rem]" : "inputstyle md:w-[6.5rem] outline-Purple hover:inputstylehover";
    };

    return (
        <section className="bg-White w-[90vw] md:h-[57vh] md:max-w-[42vw] h-[70vh] flex-row items-center justify-center mx-[1.5rem] rounded-t-3xl rounded-l-3xl rounded-br-[6rem] px-4 md:px-[1.5rem] my-[4rem] pt-[1rem]">
            <ul className="flex md:w-[33vw] mx-2 mt-5 space-x-5 md:space-x-12 pb-[6rem] md:pb-[2rem] border-b-[2px] border-Lightgrey">
                <li className="listyle">
                    <label className="text-Smokeygrey text-sm tracking-widest" htmlFor="day">DAY</label>
                    <input id="day" className={inputStyle('day')} type="number" placeholder="DD" value={day} onChange={(e) => setDay(e.target.value)} />
                    {errors.day && <p className="error md:w-[8rem] md:text-[10px]">{errors.day}</p>}
                </li>
                <li className="listyle">
                    <label className="text-Smokeygrey text-sm tracking-widest" htmlFor="month">MONTH</label>
                    <input id="month" className={inputStyle('month')} type="number" placeholder="MM" value={month} onChange={(e) => setMonth(e.target.value)} />
                    {errors.month && <p className="error md:w-[8rem] md:text-[10px]">{errors.month}</p>}
                </li>
                <li className="listyle">
                    <label className="text-Smokeygrey text-sm tracking-widest" htmlFor="year">YEAR</label>
                    <input id="year" className={inputStyle('year')} type="number" placeholder="YYYY" value={year} onChange={(e) => setYear(e.target.value)} />
                    {errors.year && <p className="error md:w-[8rem] md:text-[10px]">{errors.year}</p>}
                </li>
            </ul>
            <div className='md:flex md:justify-end'>
                <button className="bg-Purple hover:bg-Offblack md:ml-[auto] w-[4rem] h-[4rem] rounded-full flex justify-center items-center absolute mt-[-2rem] ml-[7.5rem]" onClick={validateInput}>
                    <img className="w-[2rem] h-[2rem]" src={ArrowPurple} alt="Arrow Down" />
                </button>
            </div>
            <div className='flex-col mx-2 mt-[4rem] md:mt-[1rem] items-start justify-center'>
                <p className='ResultStyle leading-none'>
                    <span className='SpanPurple'>{result.years !== null ? result.years : '--'}</span> years
                </p>
                <p className='ResultStyle leading-none'>
                    <span className='SpanPurple'>{result.months !== null ? result.months : '--'}</span> months
                </p>
                <p className='ResultStyle leading-none'>
                    <span className='SpanPurple'>{result.days !== null ? result.days : '--'}</span> days
                </p>
                {errors.date && <p className="error">{errors.date}</p>}
            </div>
        </section>
    )
}
