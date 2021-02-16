/* Core */
import NextLink from 'next/link';
import Image from 'next/image';

/* Components */
import { Li, Link } from '@/components/styled';

/* Instruments */
import * as gql from '@/graphql';

export const ListCharacter: React.FC<ListCharacterProps> = props => {
    const { character } = props;

    return (
        <Li key = { character.id }>
            <NextLink
                href = {{
                    pathname: '/characters/[characterId]',
                    query:    { characterId: character.id },
                }}
            >
                <Link css = 'display: flex; align-items: center;'>
                    <Image height = { 50 } src = { character.image } width = { 50 } />
                    <span css = 'display: inline-block; margin-left: 10px; font-size: 24px;'>
                        {character.name}
                    </span>
                </Link>
            </NextLink>
        </Li>
    );
};

/* Types */
interface ListCharacterProps {
    character: gql.Character;
}
