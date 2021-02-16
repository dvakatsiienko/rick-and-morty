/* Instruments */
import * as gql from '@/graphql';

export type CharacterResponse = {
    info: gql.Info;
    results: gql.Character[];
    error: string;
};
