import { withAuth } from 'next-auth/middleware';

export default withAuth(
    function middleware(req) {
    },
    {
        callbacks: {
            authorized: ({ token }) => !!token, // Autoriza si hay un token
        },
    }
);

export const config = {
    matcher: ["/dashboard", "/data_explorer", "/data_transfer", "/reports", "/privacy/policy"],
};
