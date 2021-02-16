/* Components */
import { P } from '@/components/styled';

export const Field: React.FC<FieldProps> = props => {
    if (!props.value) {
        return null;
    }

    return (
        <P>
            {props.title}: {props.value}
        </P>
    );
};

interface FieldProps {
    title: string;
    value: string | number;
}
