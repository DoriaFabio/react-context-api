import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
// import { useAlertContext } from "../context/AlertContext.jsx";
import { usePostContext } from "../context/postContext.jsx";
import Card from "../components/Card.jsx"
// import { GlobalContext } from "../context/GlobalContext.jsx";

const apiUrl = import.meta.env.VITE_API_URL;
function Blog() {
  const [post, setPost] = useState([]);
  const { setPostData } = usePostContext();

  // const { count } = useContext(GlobalContext);

  // console.log(count);

  useEffect(() => {
    console.log("è stato eseguito use effect");
    getData();
  }, []);

  function getData() {
    axios.get(`${apiUrl}/posts`).then((res) => {
      console.log(res.data);
      setPost(res.data.data);
      const id = res.data.data.id;
      const titolo = res.data.data.titolo;
      const contenuto = res.data.data.contenuto;
      const immagine = res.data.data.immagine;
      usePostContext(
        {
          id: `${id}`,
          titolo: `${titolo}`,
          contenuto: `${contenuto}`,
          immagine: `${immagine}`,
        }
      )


    })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        console.log("Finito");
      });
  }

  function deleteItem(e, id) {
    axios.delete(`${apiUrl}/posts/${id}`).then((res) => {
      console.log(res);
      console.log(res.data);
      getData();
    })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        console.log("finally");
      })
      ;
  }

  return (
    <main className="container mb-5 mt-2">
      <h1 className="text-center mb-3">Elenco Post</h1>
      <div className="row gy-4">
        {post.length > 0
          ? post.map((p) => (
            <div className="col-12 col-md-6 col-lg-4" key={p.id}>
              <Card
                data={p}
                // immagine={p.immagine}
                // titolo={p.titolo}
                // contenuto={p.contenuto}
                // tags={p.tags.join(", ")}
                onDeletePost={(e) => {
                  deleteItem(e, p.id)
                }}
              />
            </div>
          ))
          : "Non ci sono post"}
        <div className="col-12 py-4 d-flex justify-content-center">
          <Link to="/posts/create" className="btn btn-success">Aggiungi nuovo post</Link>
        </div>
      </div>
      {/* <ul>
          {character.map((char) => (
            <li key={char.id}>{char.name}</li>
          ))}
        </ul> */}
    </main>
  );
}
export default Blog;