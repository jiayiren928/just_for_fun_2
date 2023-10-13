import './styles/Text.css';

const SignText = ({ children, prifix = '', subfix = '' }) => {
    return (
        <div className='sign-text-comp'>
            {
                !!prifix && <span className='sign-text-comp-desc'>{prifix}</span> 
            }
            <span className='sign-text-comp-content'>{children}</span>
            {
                !!subfix && <span className='sign-text-comp-desc'>{subfix}</span> 
            }
        </div>
    )
}

export default SignText;