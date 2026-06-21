import { useNavigate, useParams } from "react-router-dom";
import dbServices from "../appwrite/database";
import { useEffect, useState } from "react";
import { Container, PostForm } from "../components";

function EditPost() {
  const { id } = useParams();
  const [post, setPost] = useState({});
  const navigate = useNavigate();
  useEffect(() => {
    if (id) {
      dbServices.getPostById(id).then((postById) => {
        if (postById) {
          setPost(postById);
        }
      });
    } else {
      navigate("/");
    }
  }, [id, navigate]);

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
