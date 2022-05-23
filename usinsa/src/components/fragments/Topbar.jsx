import { Link } from 'react-router-dom'
import '../../mycss.css'

function Topbar(){
    return (
        <div className="navbar navbar-expand navbar-light my-topbar bg-black static-top shadow">
            <h1 className="top-title">    
                <Link to="/" className="top-title"> USINSA</Link>
            </h1>

            <form className="d-none d-sm-inline-block form-inline mr-auto md-3 my-2 my-md-0 ml-5 navbar-search">
                <div className="input-group">
                    <input type="text" className="form-control bg-light border-0 small" placeholder="Search for..."
                        aria-label="Search" aria-describedby="basic-addon2"/>
                    <div className="input-group-append">
                        <button className="btn search-btn" type="button">
                            <i className="fas fa-search fa-sm"></i>
                        </button>
                    </div>
                </div>
            </form>

            <ul className="navbar-nav ml-auto">
                <li className="top-item">
                    <Link className="top-link" to="/lank/">
                        랭킹
                    </Link>
                </li>
                <li className="top-item">
                    <Link className="top-link" to="/update/">
                        업데이트
                    </Link>
                </li>
                <li className="top-item">
                    <Link className="top-link" to="/sale/">
                        세일
                    </Link>
                </li>
                <li className="top-item">
                    <Link className="top-link" to="/event/">
                        이벤트
                    </Link>
                </li>
                <li className="top-item">
                    <Link className="top-link" to="/brand/">
                        브랜드
                    </Link>
                </li>
                <div className="d-none d-sm-block"></div>
            </ul>

        </div>
    )    
}

export default Topbar