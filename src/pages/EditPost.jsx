import { useNavigate, useParams } from "react-router-dom";
import dbServices from "../appwrite/database";
import { useEffect, useState } from "react";
import { Container, PostForm } from "../components";

function EditPost() {
  const { id } = useParams();
  const [post, setPost] = useState({});
  const navigate = useNavigate();

  console.log("id in editpost",id)
  useEffect(() => {
    if (id) {
      dbServices.getPostById(id).then((postById) => {
        if (postById) {
          setPost(postById);
        }
        console.log("postById in editpost",postById)
      });
    } else {
      navigate("/");
    }
  }, [id, navigate]);
  
  console.log("post in editpost",post)

  return (
    <>
      {post ? (
        <div className="py-8">
          <Container>
            <PostForm post={post} />
          </Container>
        </div>
      ) : null}
    </>
  );
}

export default EditPost;
