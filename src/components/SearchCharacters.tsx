/* Core */
import { useState } from 'react';
import { useRouter } from 'next/router';
import { useCombobox } from 'downshift';
import debounce from 'lodash.debounce';
import useSWR from 'swr';

/* Components */
import { Li, SearchStyles, DropDown, DropDownItem } from '@/components/styled';
import { ListCharacter } from '@/components';

/* Instruments */
import * as gql from '@/graphql';

export const SearchCharacters: React.FC<SearchCharactersProps> = () => {
    const router = useRouter();
    const [ searchedCharacter, setSearchedCharacter ] = useState('');

    const { data, error } = useSWR<Response>(
        `${API_URL}/api/character?name=${searchedCharacter}`,
    );
    console.log(searchedCharacter);

    const setSearchedCharacterDebounced = debounce(setSearchedCharacter, 350);

    const {
        inputValue: searchTerm,
        getMenuProps,
        getInputProps,
        getComboboxProps,
        getItemProps,
        highlightedIndex,
        isOpen,
    } = useCombobox({
        id:    'lang-switcher',
        items: data?.results ?? [],
        onInputValueChange() {
            setSearchedCharacter(searchTerm);
        },
        onSelectedItemChange(options) {
            router.push(`/characters/${options.selectedItem.id}`);
        },
        itemToString: character => character?.name ?? '',
    });

    const foundProductsJSX =
        isOpen &&
        searchedCharacter &&
        data?.results?.map((character, index) => {
            return (
                <DropDownItem
                    $highlighted = { index === highlightedIndex }
                    { ...getItemProps({ item: character, index }) }
                    key = { character.id }
                >
                    <ListCharacter character = { character } />
                </DropDownItem>
            );
        });

    const isLoading = !data && !error;

    return (
        <SearchStyles>
            <div { ...getComboboxProps() }>
                <input
                    { ...getInputProps({
                        id:          'search',
                        type:        'search',
                        placeholder: '🔍 Search for a character...',
                        className:   isLoading ? 'loading' : '',
                    }) }
                />
            </div>
            <DropDown { ...getMenuProps() }>
                {foundProductsJSX}

                {isOpen && !data?.results?.length && !isLoading && (
                    <DropDownItem $highlighted = { false }>
                        <Li>🤷🏼‍♂️ No characters found.</Li>
                    </DropDownItem>
                )}
            </DropDown>
        </SearchStyles>
    );
};

/* Helpers */
const API_URL = process.env.NEXT_PUBLIC_API_URL;

/* Types */
interface SearchCharactersProps {
    test?: string;
}

type Response = {
    info: gql.Info;
    results: gql.Character[];
    error: string;
};
