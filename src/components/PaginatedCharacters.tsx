/* Core */
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import waait from 'waait';

/* Components */
import { Ul, Button, H4 } from '@/components/styled';
import { ListCharacter } from '@/components';

/* Instruments */
import * as gql from '@/graphql';
import * as types from '@/types';

export const PaginatedCharacters: React.FC<PaginatedCharactersProps> = props => {
    const router = useRouter();

    const [ lastDirection, setLastDirection ] = useState<Direction>(null);
    const [ characters, setCharacters ] = useState<gql.Character[]>(null);
    const [ currentPage, setCurrentPage ] = useState(props.initialPage);
    const [ cursor, setCursor ] = useState(() => props.initialPage * 6 - 6);
    const [ maxCurrentPage, setMaxCurrentPages ] = useState(0);

    const initialPaginationPage = Math.ceil(
        props.initialPage * ITEMS_PER_PAGE / ITEMS_PER_QUERY,
    );
    const [ paginationPage, setPaginationPage ] = useState(
        initialPaginationPage === 0 ? 1 : initialPaginationPage,
    );

    const resetPagination = () => {
        router.replace('/characters?page=1');
        setCursor(0);
        setCurrentPage(1);
        setPaginationPage(1);
    };

    const { data } = useSWR<types.CharacterResponse>(
        `${API_URL}/api/character?page=${paginationPage}`,
        {
            onSuccess(response) {
                if (response.error === 'There is nothing here') {
                    resetPagination();
                    return null;
                }

                const maxCurrentPage = parseInt(
                    String(response.info.count / ITEMS_PER_PAGE + 1),
                );
                const isCurrentPageExceeded = currentPage > maxCurrentPage;

                if (isCurrentPageExceeded) {
                    resetPagination();
                    return null;
                }

                const isInitializing = characters === null;

                if (isInitializing) {
                    setMaxCurrentPages(maxCurrentPage);
                }

                const initialCharactersCells = [
                    ...Array(response.info.count).fill(null),
                ];

                const nextCharacters = isInitializing
                    ? initialCharactersCells
                    : [ ...characters ];
                let startIndex =
                    paginationPage * ITEMS_PER_QUERY - ITEMS_PER_QUERY;

                response.results.forEach(character => {
                    nextCharacters[startIndex] = character;
                    startIndex++;
                });

                setCharacters(nextCharacters);
            },
        },
    );

    const isPrevDisabled = cursor === 0;
    const isNextDisabled = data?.info?.count - 6 === cursor - 1;

    const navigateToPage = (direction: Direction) => {
        if (direction === 'prev' && !isPrevDisabled) {
            setLastDirection(direction);
            const nextPage = currentPage - 1;
            setCurrentPage(nextPage);
            setCursor(cursor - ITEMS_PER_PAGE);
            router.replace({ query: { page: nextPage } });
        }
        if (direction === 'next' && !isNextDisabled) {
            setLastDirection(direction);
            const nextPage = currentPage + 1;
            setCurrentPage(nextPage);
            setCursor(cursor + ITEMS_PER_PAGE);
            router.replace({ query: { page: nextPage } });
        }
    };

    const slicedList = characters?.slice(cursor, cursor + 6) ?? [];

    useEffect(() => {
        const currentPaginationChunk = paginationPage * ITEMS_PER_QUERY;
        const nextChunk = cursor + 6;
        const isPreloadRequired = nextChunk > currentPaginationChunk;
        let nextPaginationPage = isPreloadRequired
            ? paginationPage + 1
            : paginationPage;

        if (lastDirection === 'prev') {
            nextPaginationPage--;
        }

        setPaginationPage(nextPaginationPage);

        if (characters === null && cursor < currentPaginationChunk) {
            (async () => {
                await waait(100);
                setPaginationPage(nextPaginationPage - 1);
                await waait(100);
                setPaginationPage(nextPaginationPage);
            })();
        }
    }, [ cursor ]);

    const charactersJSX = slicedList
        .filter(x => x)
        .map(character => {
            return <ListCharacter character = { character } key = { character.id } />;
        });

    return (
        <>
            <div css = 'display: flex;'>
                <Button
                    css = 'margin-right: 20px;'
                    disabled = { isPrevDisabled }
                    onClick = { () => navigateToPage('prev') }
                >
                    ← Prev
                </Button>

                <H4 css = 'margin: 0 20px 0 0;'>
                    {currentPage} of {maxCurrentPage}
                </H4>

                <Button
                    disabled = { isNextDisabled }
                    onClick = { () => navigateToPage('next') }
                >
                    Next →
                </Button>
            </div>

            <Ul $flex-direction = 'column'>{charactersJSX}</Ul>
        </>
    );
};

/* Helpers */
const API_URL = process.env.NEXT_PUBLIC_API_URL;
const ITEMS_PER_PAGE = parseInt(process.env.NEXT_PUBLIC_ITEMS_PER_PAGE);
const ITEMS_PER_QUERY = parseInt(process.env.NEXT_PUBLIC_ITEMS_PER_QUERY);

/* Types */
interface PaginatedCharactersProps {
    initialPage: number;
}

type Direction = 'next' | 'prev';
