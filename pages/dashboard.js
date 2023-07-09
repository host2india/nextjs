import { useState, useEffect } from 'react';
import { getSession, signOut, signIn } from 'next-auth/react';
import Link from 'next/link';

function Dashboard() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const securePage = async () => {
      const session = await getSession();
      console.log({ session });
      if (!session) {
        signIn();
      } else {
        setLoading(false);
      }
    };

    securePage();
  }, []);

  if (loading) {
    return <h2>Loading...</h2>;
  }
  return (
    <div>
      <h1>Dashboard page</h1>
      <button onClick={() => signOut()}>Sign Out</button>
      <br />
      <br />
      <Link href="/">
        <button>Go to Home</button>
      </Link>
    </div>
  );
}

export default Dashboard;
