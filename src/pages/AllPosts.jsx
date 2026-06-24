import { useEffect } from "react";
// import dbServices from "../appwrite/database";
import { Container, PostCard } from "../components";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "../store/post/postThunk";

function AllPosts() {
  // const [posts, setPosts] = useState([]);
  const dispatch = useDispatch();
  const { posts, loading } = useSelector((state) => state.post);

  useEffect(() => {
    // dbServices
    //   .getPosts()
    //   .then((allPosts) => {
    //     if (allPosts) {
    //       setPosts(allPosts.rows);
    //     }
    //   })
    //   .catch((err) => console.log("Failed to get Posts : AllPosts Page", err));

    if (posts.length === 0) {
      dispatch(fetchPosts());
    }
  }, [posts.length]);

  console.log("posts in all Post page", posts);

  if (loading) return <h1>Loading...</h1>;

  return (
    <>
      <div className="w-full py-8">
        <Container>
          <div className="flex flex-wrap">
            {posts?.map((post) => (
              <div key={post.$id} className="p-2 w-1/4">
                <PostCard {...post} />
              </div>
            ))}
          </div>
        </Container>
      </div>
    </>
  );
}

export default AllPosts;
