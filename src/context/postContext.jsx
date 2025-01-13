import { createContext, useContext, useState, useEffect } from "react";
import axios from 'axios';

const PostContext = createContext();
const apiUrl = import.meta.env.VITE_API_URL;

const PostProvider = ({children})=>{
    // const PostData = {id: "", titolo: "", contenuto: "", immagine: ""};
    // const [postData, setPostData] = useState(PostData);

    const [tagsList, setTagsList] = useState([]);
    // const [alert, setAlert] = useState({ type: "", message: "" });

    useEffect(() => {
        getTags();
    }, []);

    function getTags() {
        axios.get(apiUrl + "/tags").then((res) => {
        console.log(res.data);
        setTagsList(res.data.data);
        })
        .catch((error) => {
            console.log(error);
        })
        .finally(() => {
            console.log("Finito");
        });
    }

    return (
        <PostContext.Provider value={{ tagsList }}>
            {children}
        </PostContext.Provider>
    );
};

function usePostContext() {
    const context = useContext(PostContext);
    return context;
}

export {PostProvider, usePostContext};