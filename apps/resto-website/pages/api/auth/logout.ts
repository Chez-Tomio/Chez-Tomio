import type { NextApiRequest, NextApiResponse } from 'next';

export default (req: NextApiRequest, res: NextApiResponse) => {
    const returnTo = 'http://localhost:3000';
    res.redirect(
        `https://${process.env.COGNITO_DOMAIN}/logout?client_id=${
            process.env.COGNITO_CLIENT_ID
        }&logout_uri=${encodeURIComponent(returnTo)}`,
    );
};
