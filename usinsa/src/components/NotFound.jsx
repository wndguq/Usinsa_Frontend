import { Link } from 'react-router-dom'

function NotFound(){
    return(
        <div className='display-f flex-center'>
            <p> 잘못된 경로입니다. </p>
            <Link to="/"> USINSA</Link>
        </div>
    )
}

export default NotFound