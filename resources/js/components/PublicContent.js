import React, {useEffect,useState} from 'react';
import ReactDOM from 'react-dom';
import Pagination from "react-js-pagination";

function PublicContent() {

    const [state, setData] = useState({
        users: ''
    });

    const fetchData = async (pageNumber = 1) => {
        const api = await fetch(`api/user?page=${pageNumber}`);
        setData({

            users: await api.json()
        });

    };

    useEffect(() => {
        fetchData();
    }, [])
    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card">
                        <div className="card-header">User List : CodeCheef</div>
                        <div className="card-body">
                            
                            <div>
                                <Pagination
                                    activePage={state?.users?.current_page ? state?.users?.current_page : 0}
                                    itemsCountPerPage={state?.users?.per_page ? state?.users?.per_page : 0 }
                                    totalItemsCount={state?.users?.total ? state?.users?.total : 0}
                                    onChange={(pageNumber) => {
                                        fetchData(pageNumber)
                                    }}
                                    pageRangeDisplayed={8}
                                    itemClass="page-item"
                                    linkClass="page-link"
                                    firstPageText="First Page"
                                    lastPageText="Last Lage"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PublicContent;

if (document.getElementById('PublicContent')) {
ReactDOM.render(<PublicContent />, document.getElementById('PublicContent'));
}
