import { SearchBar } from "@/components/SearchBar/SearchBar";
import { useState } from "react";
import styles from "./SideNavbarSearchExtension.module.css";

export const SideNavbarSearchExtension = () => {
  const [searchResults, setSearchResults] = useState<any[]>([]);
  return (
    <div className={styles.navbarSearchExtension}>
      <div className="my-3">
        <h5 className={`text mt-2 mb-4`}>Search</h5>
        <SearchBar setSearchResults={setSearchResults} />
      </div>
      <div className="w-100 border-top">
        <div className={`text mt-3`}>Recent</div>
        <div></div>
      </div>
    </div>
  );
};
