import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { Box, SxProps, Theme } from "@mui/material";
import { useState } from "react";

const Instructions = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <Box sx={isOpen ? styles.open : { ...styles.open, transform:"translate(-50%,80%)"}}>
      <Box
        sx={styles.icon}
        onClick={() => {
          setIsOpen((prev) => !prev);
        }}
      >
        {isOpen ? <KeyboardArrowDownIcon /> : <KeyboardArrowUpIcon />}
      </Box>
      <h3>
        1. Click allow location share and observe the search bar input change
      </h3>
      <p>
        2. Delete this host 'https://dianaleo.github.io/GoogleLocationSearch/'
        from browser's settings - Location, and refresh the page
      </p>
      <h3>
        3. Search a location and then click allow location share, and observe no
        change on the search bar
      </h3>
    </Box>
  );
};

const styles: Record<string, SxProps<Theme>> = {
  open: {
    position: "absolute",
    left: "50%",
    transform:"translateX(-50%)",
    bottom: 0,
    padding: "20px 30px 30px",
    backgroundColor: "white",
    display: "flex",
    flexDirection: "column",
    gap: "20px",
    transition: "0.3s",
    borderRadius: "16px 16px 0 0",
    boxShadow:"0 0 10px rgba(0,0,0,0.15),0 0 3px rgba(0,0,0,0.25)",
  },
  icon: {
    cursor: "pointer",
    margin: "0 auto",
  },
};

export default Instructions;
