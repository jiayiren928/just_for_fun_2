import './styles/Input.css';

const SignInput = ({ subfixIcon, type = 'text', value = '', placeholder, onChange }) => {
    return (
        <div className='sign-input-comp'>
            <input
                value={value}
                placeholder={placeholder}
                type={type}
                onChange={(e) => {
                    e.persist()
                    onChange(e.target.value);
                }} />
            {
                !!subfixIcon && <span>{subfixIcon}</span>
            }
        </div>
    )
}

export default SignInput;