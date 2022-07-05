import request, { gql } from "graphql-request";
import { useSession } from "next-auth/react";
import Layout from "../components/Layout";
import Post from "../components/Post";

export default function Home(props) {
  const { data: session, status } = useSession();

  return (
    <Layout>
      {session ? (
        <div>
          <h1>Posts</h1>
          {props.publishedPosts.map((post) => {
            return (
              <div key={post.id} className="post">
                <Post post={post} />
              </div>
            );
          })}
        </div>
      ) : (
        <div>You need to be logged In.</div>
      )}
    </Layout>
  );
}

export async function getServerSideProps({ req, res }) {
  const query = gql`
    {
      publishedPosts {
        content
        id
        published
        title
        author {
          email
          name
          id
        }
      }
    }
  `;

  const data = await request("http://localhost:3000/api/graphql", query);

  return {
    props: data,
  };
}
