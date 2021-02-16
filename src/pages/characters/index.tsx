/* Core */
import { NextPage, GetServerSideProps, InferGetStaticPropsType } from 'next';

/* Components */
import {
    Layout,
    Nav,
    SearchCharacters,
    PaginatedCharacters
} from '@/components';

/* Instruments */
import { strings } from '@/data';

const CharactersPage: NextPage = (
    props: InferGetStaticPropsType<typeof getServerSideProps>,
) => {
    return (
        <Layout>
            <Nav title = { strings.allCharacters } />
            <SearchCharacters />
            <PaginatedCharacters initialPage = { props.initialPage } />
        </Layout>
    );
};

export const getServerSideProps: GetServerSideProps = async ctx => {
    const page = Number(ctx.query.page ?? 1);

    let initialPage = page;

    if (Number.isNaN(page) || page < 1 || !ctx.query.page) {
        if (ctx.res) {
            ctx.res.writeHead(301, {
                Location: '/characters?page=1',
            });
            ctx.res.end();
        }

        initialPage = 1;
    }

    return await { props: { initialPage } };
};

export default CharactersPage;
