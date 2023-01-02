import { createContainer } from "unstated-next"
import {useState} from "react";
import {User} from "../client/generated";
import {UsersClient} from "../client/client";

const useExampleStateHook = () => {
    const [myNumber, setMyNumber] = useState(0)
    const [user, setUser] = useState<User | null>(null);

    const increment = () => setMyNumber(myNumber + 1)
    const fetchUser = async () => {
        setUser(await UsersClient.userControllerGetLatestUser());
    }

    return { myNumber, user, increment, fetchUser }
}

export const ExampleState = createContainer(useExampleStateHook);
export const useExampleState = () => ExampleState.useContainer();
