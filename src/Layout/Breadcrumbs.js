import { Link } from "react-router-dom";


export const Breadcrumbs = ({ crumbs }) => {
    return (
        <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
                <li key="0" className="breadcrumb-item"><Link to="/">Home</Link></li>
                {crumbs.map(( crumb, index ) => {
                    if (crumb.link) {
                        return <li key={index + 1} className="breadcrumb-item" aria-current="page"><Link to={crumb.link}>{crumb.name}</Link></li>
                    } else {
                        return <li key={index + 1} className="breadcrumb-item active" aria-current="page">{crumb.name}</li>
                    }
                })}
            </ol>
        </nav>
    );
}

export default Breadcrumbs;