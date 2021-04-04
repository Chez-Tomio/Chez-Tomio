// import { providers, signIn } from 'next-auth/client';

// export default function SignIn({ providers }) {
//     return (
//         <>
//             <h1>Custom SignIn Page</h1>
//             {Object.values(providers).map((provider) => (
//                 <div key={provider.name}>
//                     <button onClick={() => signIn(provider.id)}>
//                         Sign in with {provider.name}
//                     </button>
//                 </div>
//             ))}
//         </>
//     );
// }

// // This is the recommended way for Next.js 9.3 or newer
// export async function getServerSideProps(context) {
//     const providers = await providers();
//     return {
//         props: { providers },
//     };
// }
