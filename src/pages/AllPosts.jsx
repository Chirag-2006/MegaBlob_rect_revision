import { useEffect, useState } from "react";
import dbServices from "../appwrite/database";
import { Container, PostCard } from "../components";

function AllPosts() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    dbServices
      .getPosts()
      .then((allPosts) => {
        if (allPosts) {
          setPosts(allPosts.rows);
        }
      })
      .catch((err) => console.log("Failed to get Posts : AllPosts Page", err));
  }, []);

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
