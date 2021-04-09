/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from '@emotion/react';
import Link from 'next/link';
import { signIn, useSession } from 'next-auth/client';

export const LoginButton: React.FC = () => {
    const [session, loading] = useSession();

    return (
        <div
            css={css`
                display: flex;
                align-items: center;
                justify-content: center;
                margin-left: 15px;
            `}
        >
            {!loading && session ? (
                <Link href="/client/profil">
                    <svg
                        fill="currentColor"
                        viewBox="0 0 16 16"
                        css={css`
                            height: 35px;
                            transition: 0.2s;
                            cursor: pointer;
                            &:hover {
                                transform: translateY(-3px);
                            }
                        `}
                    >
                        <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                        <path d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z" />
                    </svg>
                </Link>
            ) : (
                <svg
                    fill="currentColor"
                    viewBox="0 0 16 16"
                    onClick={() => signIn('cognito')}
                    css={css`
                        height: 35px;
                        transition: 0.2s;
                        cursor: pointer;
                        &:hover {
                            transform: translateY(-3px);
                        }
                    `}
                >
                    <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                    <path d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z" />
                </svg>
            )}
        </div>
    );
};
