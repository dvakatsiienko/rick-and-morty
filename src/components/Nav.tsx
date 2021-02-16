/* Core */
import NextLink from 'next/link';

/* Components */
import { H1, Ul, Li, Link } from '@/components/styled';

/* Instruments */
import { strings } from '@/data';

export const Nav: React.FC<NavProps> = props => {
    return (
        <>
            <nav>
                <Ul>
                    <Li>
                        <NextLink href = '/characters?page=1'>
                            <Link>{strings.allCharacters}</Link>
                        </NextLink>
                    </Li>
                </Ul>
            </nav>
            <hr />

            <H1>{props.title}</H1>
        </>
    );
};

/* Types */
interface NavProps {
    title: string;
}
