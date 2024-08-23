
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import Auth0Provider from "next-auth/providers/auth0"

export const {handlers, auth, signIn, signOut} = NextAuth({
    debug: true,
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        }),
        Auth0Provider({
            clientId: process.env.AUTH0_CLIENT_ID,
            clientSecret: process.env.AUTH0_CLIENT_SECRET,
            issuer: process.env.AUTH0_ISSUER
        })
    ],
    session: {
        strategy: 'jwt',
    },
    callbacks: {
        async jwt({ token, user }) {
            console.log('User:', user);
            console.log('Token before set id:', token);
            if (user) { // User is available during sign-in
                token.id = user.id || user.email;
            }
            return token;
        },
        async session({ session, token }) {
            console.log('Token in session:', token);
            console.log('Created Session:', session);
            if (token.id) {
                session.user.id = token.id as string;

            }
            return session;
        },
    },
});