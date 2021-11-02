import React, {useEffect,useState} from 'react';
import ReactDOM from 'react-dom';


function PublicContent() {
    const [publicContent, setUserContent] = useState([]);
    const [nowPage,setNowPage] = useState(1);

    useEffect(() => {
        getUsers();
    },[nowPage]);

    const getUsers = async () => {
        const response = await axios.get(`/api/user?page=${nowPage}`);
        setUserContent(response);
        console.log("中身表示");
        console.log(response);
    }

    function add_current_page(){
        setNowPage(nowPage+1);
        //useEffect();
    }
    return (
        <div>
            <h1>Userペ-ジ</h1>
            {publicContent?.data?.data?.map((data,index)=>(
                <div key={index}>
                    <p>{data.name}</p>
                    <p>{data.contentName}</p>
                    <a name={data.contentName}>AR</a>
                </div>
            ))}
            <a onClick={add_current_page}>次に</a>


        </div>
    );
}

export default PublicContent;

if (document.getElementById('PublicContent')) {
ReactDOM.render(<PublicContent />, document.getElementById('PublicContent'));
}
