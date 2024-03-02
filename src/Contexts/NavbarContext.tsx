import React, {
  PropsWithChildren,
  createContext,
  useContext,
  useState,
} from "react";

interface NavbarContextType {
  selectedNavItem: string | null;
  setSelectedNavItem: (value: string | null) => void;
}

const NavbarContext = createContext<NavbarContextType>({
  selectedNavItem: null,
  setSelectedNavItem: () => {},
});

function NavbarContextProvider(props: PropsWithChildren<{}>) {
  const [selectedNavItem, setSelectedNavItem] = useState<string | null>(null);

  return (
    <NavbarContext.Provider value={{ selectedNavItem, setSelectedNavItem }}>
      {props.children}
    </NavbarContext.Provider>
  );
}

export const useNavbar = () => useContext(NavbarContext);
export default NavbarContextProvider;
