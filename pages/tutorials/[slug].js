
import React from 'react';
import { useRouter } from 'next/router';

export default function Tutorial()
{
  const { slug }= useRouter();


  return (
    <>
      <div className='desc flex justify-center items-center min-h-lvh w-full'>
        <h2 className='dark:text-white text-3xl capitalize mb-32 font-medium'>Coming Soon!</h2>
      </div>
    </>
  );
};


// export async function getServerSideProps ( context ) {
//   try {
//     const res = await fetch( `${process.env.Next_Public_Url}/api/tutorials?filters[slug]=${context.query.slug}&populate=*` );
//     if ( !res.ok ) {
//       throw new Error( 'Failed to get data from the SERVER!' );
//     }

//     let products = await res.json();
//     return {
//       props: { product: products.data[0] },
//     };
//   } catch ( error ) {
   
//     return {
//       props: { error: 'Oops! Something went wrong. Please try again later.' },
//     };
//   }
// }

