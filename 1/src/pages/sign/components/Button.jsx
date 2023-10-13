import './styles/Button.css';

const Button = ({ children, onClick, type = 'black' }) => {
    return (
        <>
            {
                type === 'black' ? <button className='black-button' onClick={onClick}>
                    {children}
                </button> : null
            }

{
                type === 'sign' ? <button className='sign-button' onClick={onClick}>
                    {children}
                </button> : null
            }
        </>
    )
}

export default Button;