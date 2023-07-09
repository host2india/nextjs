import { getSession, useSession, signOut } from 'next-auth/react';
import Link from 'next/link';

function Blog({ data }) {
  const { data: session } = useSession();

  const handleSignOut = () => {
    signOut();
  };

  return (
    <div>
      <h1>Blog page - {data}</h1>
      {session ? (
        <>
          <button onClick={handleSignOut}>Sign Out</button>
          <br />
          <br />
          <Link href="/">
            <button>Go to Home</button>
          </Link>
        </>
      ) : (
        <p>Please sign in to view this page.</p>
      )}
    </div>
  );
}

export default Blog;

export async function getServerSideProps(context) {
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        destination: '/api/auth/signin?callbackUrl=http://localhost:3000/blog',
        permanent: false,
      },
    };
  }
  return {
    props: {
      data: 'List of 100 personalized blogs',
      session,
    },
  };
}
