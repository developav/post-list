import { useQuery } from "@tanstack/react-query";
import { FC } from "react";
import { queryClient } from "../../api/queryClient";
import { Loader } from "../Loader";
import { UserView } from ".";
import { fetchMe } from "../../api/User";

interface FetchUserViewProps {
    userId: string;
}
export const FetchUserView: FC<FetchUserViewProps> = ({ userId }) => {
    const userQuery = useQuery({
        queryFn: () => fetchMe(),
        queryKey: ["me", userId],
        retry: 0,
    }, queryClient);
    switch(userQuery.status) {
        case "pending":
            return <Loader />;

        case "success": 
            return <UserView user = {userQuery.data}/>;
        case "error":
            return  <div>
                        <span>Произошла ошибка :(</span>
                        <button onClick={ () => userQuery.refetch()}>Попробовать еще раз</button>
                    </div>
    }
};