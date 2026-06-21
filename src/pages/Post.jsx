import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import dbServices from "../appwrite/database";
import { useSelector } from "react-redux";
import { Buttton, Container } from "../components";
import storageServices from "../appwrite/storage";
import parse from "html-react-parser";

function Post() {
  const [post, setPost] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  const userData = useSelector((state) => state.userData);
  const isAuthor = post && userData ? post.userId === userData.$id : false;

  useEffect(() => {
    if (id) {
      dbServices.getPostById(id).then((postById) => {
        if (postById) {
          setPost(postById);
        } else {
          navigate("/");
        }
      });
    } else {
      navigate("/");
    }
  }, [navigate, id]);

  function deletePost() {
    dbServices.deletePost(post.$id).then((status) => {
      if (status) {
        storageServices.deleteFile(post.featuredImage).then((status) => {
          if (status) {
            navigate("/");
          }
        });
      }
    });
  }

  return post ? (
    <div className="py-8">
      <Container>
        <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2">
          <img
            src={storageServices.filePreview(post.featuredImage)}
            alt={post.title}
            className="rounded-xl"
          />

          {isAuthor && (
            <div className="absolute right-6 top-6">
              <Link to={`/edit-post/${post.$id}`}>
                <Buttton bgColor="bg-green-500" className="mr-3">
                  Edit
                </Buttton>
              </Link>
              <Buttton bgColor="bg-red-500" onClick={deletePost}>
                Delete
              </Buttton>
            </div>
          )}
        </div>
        <div className="w-full mb-6">
          <h1 className="text-2xl font-bold">{post.title}</h1>
        </div>
        <div>{parse(post.content)}</div>
      </Container>
    </div>
  ) : (
    <div className="w-full py-8 mt-4 text-center">
      <Container>
        <div className="flex flex-wrap">
          <div className="p-2 w-full">
            <h1 className="text-2xl font-bold hover:text-gray-500">
              Loading post...
            </h1>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default Post;
