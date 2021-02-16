/* Core */
import styled, { keyframes } from 'styled-components';
import { lighten } from 'polished';

export const DropDown = styled.div`
    position: absolute;
    z-index: 2;
    width: 100%;
    border: 1px solid var(--color-1);
`;

export const DropDownItem = styled.div<DropDownItemProps>`
    display: flex;
    align-items: center;
    padding: 1rem;
    background: ${props => props.$highlighted ? '#f7f7f7' : 'white'};
    border-bottom: 1px solid var(--color-3);
    border-left: 10px solid
        ${props => props.$highlighted ? 'var(--color-5)' : 'var(--color-4)'};
    transition: all 0.2s;

    ${props => props.$highlighted ? 'padding-left: 2rem;' : null};

    & li {
        margin: 0;
    }
`;

const glow = keyframes`
    from {
        box-shadow: 0 0 0 yellow;
    }

    to {
        box-shadow: 0 0 10px 1px yellow;
    }
`;

export const SearchStyles = styled.div`
    position: relative;
    margin-bottom: 5rem;

    & * {
        background-color: ${lighten(0.1, '#161619')};
    }

    & input {
        width: 100%;
        padding: 10px;
        font-size: 2rem;
        color: var(--color-2);
        background-color: var(--color-8);
        border: 1px solid var(--color-5);
        border-radius: 7px;

        &::placeholder {
            color: var(--color-2);
            opacity: 1; /* Firefox */
        }

        & .loading {
            animation: ${glow} 0.5s ease-in-out infinite alternate;
        }
    }
`;

/* Types */
interface DropDownItemProps {
    $highlighted: boolean;
}
