"use client";
import { createContext, useState, useContext } from "react";

type TokenContextType = {
	token: string | null;
	setToken: (t: string) => void;
};

const TokenContext = createContext<TokenContextType>({
	token: null,
	setToken: () => {},
});

export const TokenProvider = ({ children }: { children: React.ReactNode }) => {
	const [token, setToken] = useState<string | null>(null);

	return (
		<TokenContext.Provider value={{ token, setToken }}>
			{children}
		</TokenContext.Provider>
	);
};

export const useToken = () => useContext(TokenContext);
