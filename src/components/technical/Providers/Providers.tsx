import type {ReactNode} from "react";
import {Provider} from "react-redux";
import stores from "@/stores";
import AuthProvider from "@components/technical/Providers/AuthProvider/AuthProvider.tsx";

const Providers = (props: { children: ReactNode }) => {
    return <Provider store={stores}>
        <QueryClientProvider client={stores.queryClient}>
            <AuthProvider>
                {props.children}
            </AuthProvider>
        </QueryClientProvider>
    </Provider>
}

export default Providers;
