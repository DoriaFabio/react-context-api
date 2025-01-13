import { createContext, useContext, useState } from "react";

const PostContext = createContext();

const PostProvider = ({children})=>{
    const PostData = {id: "", titolo: "", contenuto: "", immagine: ""};
    const [postData, setPostData] = useState(PostData);
    return (
        <PostContext.Provider value={{postData, setPostData}}>
            {children}
        </PostContext.Provider>
    );
};

function usePostContext() {
    const context = useContext(PostContext);
    return context;
}

export {PostProvider, usePostContext};