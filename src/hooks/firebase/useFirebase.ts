import { useState, useEffect, use } from 'react';
import Firebase from '@/lib/firebase/firebase';
import { AuthenticatedUser } from '@/types/auth/authenticatedUser';
import 'firebase/auth'; // Import the 'auth' module from Firebase

const formatAuthUser = (user: AuthenticatedUser) => {
    return {
        email: user.email,
        password: user.password,
    };
}

export default function useFirebaseAuth() {
    const [authUser, setAuthUser] = useState<AuthenticatedUser | null>(null);
    const [loading, setLoading] = useState(true);

    const authStateChanged = async (authState: any) => {
        if (!authState) {
            setAuthUser(null);
            setLoading(false);
            return;
        }

        setLoading(true);
        var formattedUser = formatAuthUser(authState);
        setAuthUser(formattedUser);
        setLoading(false);
    }

    //Listening for auth state changes.
    useEffect(() => {
        
    }, []);
}

