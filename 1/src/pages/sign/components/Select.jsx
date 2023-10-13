import './styles/Select.css';
import SignIcon from './Icon';
import { useRef, useState, useEffect } from 'react';

const Select = ({ placeholder, options, value, header, onSelected }) => {
    const [isOpen, setIsOpen] = useState(false);
    const ref = useRef(null);
    useEffect(() => {
        if (isOpen) {
            document.addEventListener("click", clickCallback, false);
            return () => {
                document.removeEventListener("click", clickCallback, false);
            };
        }
    }, [isOpen]);
    const clickCallback = (event) => {
        if (ref.current.contains(event.target)) {
            return;
        }
        setIsOpen(false);
    }

    const selected = (item) => {
        onSelected && onSelected(item)
    }

    return (
        <>
            {!!header && header}
            <div className={`sign-select-comp ${isOpen ? 'sign-select-show-comp' : ''}`}>
                <div ref={ref} className='sign-select-comp-content' onClick={() => {
                    setIsOpen(!isOpen)
                }}>
                    {value ? <span className='sign-select-value-comp'>{value}</span> : <span className='sign-select-placeholder-comp'>{placeholder}</span>}
                    <SignIcon type='arrow' />
                </div>
                {
                    options && options.length ? <div className='sign-select-options'>
                        <div className='sign-select-options-container'>
                            {
                                options.map((item, index) => <div className='sign-select-option' key={index} onClick={() => selected(item)}>{item.label}</div>)
                            }
                        </div>
                    </div> : null
                }
            </div>
        </>
    )
}

export default Select;