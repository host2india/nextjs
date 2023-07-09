import NextAuth from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import TwitterProvider from "next-auth/providers/twitter";
import LinkedInProvider from "next-auth/providers/linkedin";
import ZoomProvider from "next-auth/providers/zoom";
import FacebookProvider from "next-auth/providers/facebook"

const options = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID, // Update with the correct environment variable
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    TwitterProvider({
      clientId: process.env.TWITTER_CLIENT_ID,
      clientSecret: process.env.TWITTER_CLIENT_SECRET
    }),
    LinkedInProvider({
      clientId: process.env.LINKEDIN_CLIENT_ID,
      clientSecret: process.env.LINKEDIN_CLIENT_SECRET
    }),
    ZoomProvider({
      clientId: process.env.ZOOM_CLIENT_ID,
      clientSecret: process.env.ZOOM_CLIENT_SECRET,
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET
    }),
   
   
    // ...add more providers here
  ],
  database: process.env.MONGODB_URL,
  session: {
    jwt: true
  },
  jwt: {
    secret: 'asdcvbtjhm'
  },
  callbacks: {
    async oauth(url, token, metadata) {
      // Handle the OAuth callback with a timeout of 10 seconds
      return await oauthCallback(url, token, metadata, { timeout: 10000 });
    },
    jwt: async ({ token, user }) => {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    session: async ({ session, token }) => {
      if (token && token.id) {
        session.user.id = token.id;
      }
      return session;
    },
    
    // ...other callbacks
  },
  // ...other options
};

const NextAuthHandler = (req, res) => NextAuth(req, res, options);

export default NextAuthHandler;
