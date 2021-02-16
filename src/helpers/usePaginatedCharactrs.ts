// /* Core */
// import useSWR, { mutate } from 'swr';

// /* Instruments */
// import * as gql from '@/graphql';

// export const usePaginatedCharacters = options => {
//     useSWR<Response>(
//         `${process.env.NEXT_PUBLIC_API_URL}/api/character?page=${paginationPage}`,
//         {
//             onSuccess(response) {
//                 console.log('onSuccess');

//                 const nextCharacters1 =
//                     characters === null
//                         ? [ ...Array(response.info.count).fill(null) ]
//                         : [ ...characters ];
//                 let startIndex = paginationPage * ITEMS_PER_QUERY - 20;

//                 response.results.forEach(character => {
//                     nextCharacters1[startIndex] = character;
//                     startIndex++;
//                 });

//                 setCharacters(nextCharacters1);

//                 if (!(currentPage % 10)) {
//                     const link = `${
//                         process.env.NEXT_PUBLIC_API_URL
//                     }/api/character?page=${paginationPage - 1}`;
//                     mutate(
//                         link,
//                         fetch(link)
//                             .then(res => res.json())
//                             .then(data => {
//                                 console.log('data...', data, characters);
//                                 const nextCharacters =
//                                     characters === null
//                                         ? nextCharacters1
//                                         : [ ...characters ];
//                                 let startIndex =
//                                     (paginationPage - 1) * ITEMS_PER_QUERY - 20;
//                                 response.results.forEach(character => {
//                                     nextCharacters[startIndex] = character;
//                                     startIndex++;
//                                 });
//                                 setCharacters(nextCharacters);
//                                 setCount(count + 1);
//                             }),
//                     );
//                 }
//             },
//         },
//     );
// };

// /* Types */
// type Response = {
//     info: gql.Info;
//     results: gql.Character[];
// };
