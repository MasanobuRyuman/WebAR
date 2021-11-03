import React, {useEffect,useState} from 'react';
import ReactDOM from 'react-dom';


function PublicContent() {
    const [publicContent, setUserContent] = useState([]);
    const [nowPage,setNowPage] = useState(1);
    const [paging,setPaging] = useState([]);
    const [firstUseEffect,setFirstUseEffect] = useState(true);
    const [userName,setUserName] = useState("");
    const [saveName,setSaveName] = useState("");
    useEffect(() => {
        getUsers();
    },[nowPage]);

    useEffect(()=>{
        if (firstUseEffect == true){
            console.log("kita");
            setFirstUseEffect(false);
        }else{
            console.log(publicContent);
            pageButton();
        }
    },[publicContent]);

    const getUsers = async () => {
        const response = await axios.get(`/api/publicContentAPI?page=${nowPage}`);
        setUserContent(response);
        console.log("中身表示");
        console.log(response);
        console.log(response.data.last_page);
    }

    function add_current_page()
    {
        if(publicContent.data.last_page != nowPage){
            setNowPage(nowPage+1);
        }
    }
    function prev_current_page()
    {
        if (nowPage !=1)
        {
            setNowPage(nowPage-1);
        }
    }

    function move_page(pageNumber){
        setNowPage(pageNumber);
    }

    function pageButton()
    {
        let prev = true;
        let outputPage = nowPage;
        let list = [nowPage]
        while (true){
            if (outputPage == 1){
                prev = false;
                outputPage = nowPage;
            }

            if (prev == true){
                outputPage -= 1;
                list.unshift(outputPage);
            }else if (outputPage == publicContent.data.last_page){
                break;
            }else{
                outputPage += 1;
                list.push(outputPage);
            }
        }
        setPaging(list)
    }

    function arLink(name,saveName){
        setUserName(name);
        setSaveName(saveName);
    }

    return (
        <div>
            <h1>Userペ-ジ</h1>
            <form method="POST" action="/AR">
            {publicContent?.data?.data?.map((data,index)=>(
                <div key={index}>
                    <p>{data.contentName}</p>
                    <a onClick={() => arLink(data.name,data.saveName)}>AR</a>
                </div>
            ))}
            <a onClick={prev_current_page}>前</a>
            {paging.map((data)=>(
                <a key={data} onClick={() => move_page(data)}>{data}</a>
            ))}
            <a onClick={add_current_page}　>次</a>
            <input type="hidden" value={userName}></input>
            <input type="hidden" value={saveName}></input>
            </form>
        </div>
    );
}

export default PublicContent;

if (document.getElementById('PublicContent')) {
ReactDOM.render(<PublicContent />, document.getElementById('PublicContent'));
}
