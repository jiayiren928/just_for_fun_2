import './styles/RadioGroup.css';

const SignRadioGroup = ({ children, type = 'text', value, placeholder }) => {
    return (
        <div className='sign-radio-group-comp'>
            {children}
        </div>
    )
}

export const SignRadio = ({ isSelected, children, onClick }) => {
    return <span className="radio-label" onClick={onClick}>
        <span className="span-radio">
            <input className="span-radio-input" type="radio" />
            <span className={`span-radio-inner ${isSelected ? 'isSelected' : ''}`}></span>
        </span>
        <span className="span-text">{children}</span>
    </span>
}

SignRadioGroup.Radio = SignRadio;

export default SignRadioGroup;