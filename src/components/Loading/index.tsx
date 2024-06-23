import ReactLoading from "react-loading"
import { LoadingType } from "react-loading"

type LoadingTypes = {
    type: LoadingType;
    color: string;
}

export const Loading = ({ type = 'balls', color }: LoadingTypes) => {
    return (
        <ReactLoading type={type} color={color} height={'10%'} width={'10%'} />
    )
}