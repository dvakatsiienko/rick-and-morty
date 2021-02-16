/* Core */
import Image from 'next/image';
import styled from 'styled-components';

/* Components */
import { H3, P } from '@/components/styled';
import { Field } from './Field';

/* Instruments */
import * as gql from '@/graphql';

export const Character: React.FC<CharacterProps> = props => {
    const { character } = props;

    const episodesJSX = character.episode.map(episode => {
        return <P key = { episode.id }>{episode.name}</P>;
    });

    return (
        <Container>
            <div className = 'image'>
                <Image height = { 300 } src = { character.image } width = { 300 } />
            </div>

            <div>
                <H3 css = 'margin-top: 0;'>Overall</H3>
                <Field title = 'Species' value = { character.species } />
                <Field title = 'Type' value = { character.type } />
                <Field title = 'Status' value = { character.status } />

                <H3>Origin</H3>
                <Field title = 'Name' value = { character.origin.name } />
                <Field title = 'Type' value = { character.origin.type } />
                <Field title = 'Dimension' value = { character.origin.dimension } />
                <Field
                    title = 'Residents'
                    value = { character.origin.residents?.length }
                />

                <H3>Location </H3>
                <Field title = 'Name' value = { character.location.name } />
                <Field title = 'Type' value = { character.location.type } />
                <Field title = 'Dimension' value = { character.location.dimension } />
                <Field
                    title = 'Residents'
                    value = { character.location.residents?.length }
                />

                <H3>Episodes</H3>
                {episodesJSX}
            </div>
        </Container>
    );
};

/* Styles */
const Container = styled.section`
    display: flex;
    flex-direction: row;

    & .image {
        margin-right: 15px;
    }
`;

/* Types */
interface CharacterProps {
    character: gql.Character;
}
