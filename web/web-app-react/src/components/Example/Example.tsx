import { useExampleState } from "../../state/example";

export const Example = () => {
    const {myNumber, user, increment, fetchUser} = useExampleState();

    return <div className="flex flex-col gap-y-3">
        <div className="border-2 border-gray-300 rounded p-4">
            <button
                className="text-black bg-gray-300 py-1 px-4 rounded font-medium"
                onClick={increment}>
                Increment local state: {myNumber}
            </button>
        </div>
        <div className="border-2 border-gray-300 rounded p-4">
            <button
                className="text-black bg-gray-300 py-1 px-4 rounded font-medium"
                onClick={fetchUser}>
                Fetch remote data: {user?.firstName}
            </button>
        </div>
    </div>
}