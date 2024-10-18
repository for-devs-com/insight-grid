import NextAuth, {AuthOptions} from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import Auth0Provider from "next-auth/providers/auth0"
import jwt from "jsonwebtoken";

// Secret para firmar el token JWT
const secret = process.env.NEXTAUTH_SECRET;

export const options: AuthOptions = {
    debug: true,
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        }),
        Auth0Provider({
            clientId: process.env.AUTH0_CLIENT_ID as string,
            clientSecret: process.env.AUTH0_CLIENT_SECRET as string,
            issuer: process.env.AUTH0_ISSUER as string,
        })
    ],
    secret,
    session: {
        strategy: 'jwt',
    },
    callbacks: {
        async signIn({account, profile}) {
            if ((account?.provider === "google" || account?.provider === "auth0") && profile?.email) {
                return true;
            }
            return "/auth/error"; // Redirigir en caso de no cumplir
        },
        async jwt({token, user, account, profile}) {
            // Si el usuario y la cuenta están presentes, significa que es un nuevo inicio de sesión
            if (user && account) {
                token.sub = user.id || user.email;
                token.name = user.name || profile?.name;
                token.email = user.email;
                token.picture = user.image || profile?.image;
                token.accessToken = account.access_token;
            }

            // Verifica si el token ya ha sido firmado, de lo contrario genera uno nuevo
             if (token.accessToken) {
                 // Excluye la expiración del token original para crear un nuevo payload
                 const { exp, ...payload } = token;

                 token.accessToken = jwt.sign(
                     {
                         ...payload,
                         sub: token.sub,
                         name: token.name,
                         email: token.email,
                         picture: token.picture,
                         iat: Math.floor(Date.now() / 1000),  // Timestamp actual
                     },
                     process.env.NEXTAUTH_SECRET as string,  //
                     {
                         algorithm: 'HS256',
                         expiresIn: '1h',
                     }
                 );
             }

            console.log('Token JWT generado auht.ts:', token);
            return token;
        },
        async session({session, token}) {
            session.user.name = token.name as string;
            session.user.email = token.email as string;
            session.user.image = token.picture as string;
            session.accessToken = token.accessToken as string;
            console.log('Sesión generada auth.ts:', session);

            return session;
        },
    },
};

export default NextAuth(options);