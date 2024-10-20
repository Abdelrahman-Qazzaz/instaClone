import { SearchIcon } from "@/icons/icon.Search";
import styles from "./SearchBar.module.css";
import { XIconFill } from "@/icons/icon.X";
import { useState } from "react";
import { Button } from "react-bootstrap";
import { api } from "@/api/api";
export const SearchBar = ({
  setSearchResults,
}: {
  setSearchResults: React.Dispatch<React.SetStateAction<any[]>>;
}) => {
  const [input, setInput] = useState("");

  return (
    <div className={styles.container}>
      <Button
        onClick={() => {
          api.users.getByUsername(input);
        }}
        style={{ width: "fit-content" }}
        className="d-flex justify-content-center align-items-center p-0 m-0  me-1 bg-transparent border-0"
      >
        <SearchIcon />
      </Button>
      <div>
        <input
          type="search"
          className={`${styles.searchBar}`}
          placeholder="Search"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
      </div>
      <Button
        onClick={() => setInput("")}
        style={{ width: "fit-content" }}
        className="d-flex justify-content-center align-items-center p-0 m-0 bg-transparent border-0"
      >
        <XIconFill />
      </Button>
    </div>
  );
};
