/* Core */
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import useSWR from 'swr';

/* Components */
import { Layout, Nav, Character } from '@/components';

/* Instruments */
import * as gql from '@/graphql';

const CharacterByIdPage: NextPage = () => {
    const router = useRouter();
    const characterId = router.query.characterId as string;

    const { data, error } = useSWR<gql.Character>(
        `${API_URL}/api/character/${characterId}`,
    );

    if (!data && !error) {
        return null;
    }

    return (
        <Layout>
            <Nav title = { data?.name } />
            <Character character = { data } />
        </Layout>
    );
};

export default CharacterByIdPage;

/* Helpers */
const API_URL = process.env.NEXT_PUBLIC_API_URL;
