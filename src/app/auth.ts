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
        maxAge: 30 * 24 * 60 * 60, // 30 días
    },
    callbacks: {
        async signIn({account, profile}) {
            if ((account?.provider === "google" || account?.provider === "auth0") && profile?.email) {
                return true;
            }
            return "/auth/error"; // Redirigir en caso de no cumplir
        },
        async jwt({ token, user, account }) {
            // Si hay un inicio de sesión nuevo, asigna valores del usuario
            if (account && user) {
                token.sub = user.id || user.email;
                token.email = user.email;
            }

            const payload = {
                sub: token.sub,
                email: token.email,
                iat: Math.floor(Date.now() / 1000), // Timestamp actual
            };

            token.accessToken = jwt.sign(payload, process.env.NEXTAUTH_SECRET as string, {
                algorithm: 'HS256',
                expiresIn: '1h', // Token válido por 1 hora
            });

            console.log('Token JWT generado en jwt:', token);
            return token;
        },
        session: async function ({session, token}) {
            if (token) {
                session.user["id"] = token.sub as string;
                session.user.name = token.name as string;
                session.user.email = token.email as string;
                session.accessToken = token.accessToken as string;
            }
            return session; // Retorna la sesión actualizada
        },
    },
};

export default NextAuth(options);