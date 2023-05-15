"use client";

import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";

import { Box } from "@mui/material";
import Link from "next/link";

//////////////////////////////////////////////////

const icon = {
  marginRight: 3,
  fontSize: 40,
};

const links = [
  {
    label: "Linkedin",
    route: "https://www.linkedin.com/in/jonathan-kim-bk/",
    icon: <LinkedInIcon sx={icon} />,
  },
  {
    label: "Portfolio",
    route: "https://jonathan-kim-portfolio.vercel.app",
    icon: <BusinessCenterIcon sx={icon} />,
  },
  {
    label: "Github",
    route: "https://github.com/JONNYKIMBK/dollar-blue",
    icon: <GitHubIcon sx={icon} />,
  },
];

/////////////////////////////////////////////////

export default function Links() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: { xs: "space-evenly", sm: "center" },
        backgroundColor: "rgb(17 24 39)",
        color: "white",
      }}
    >
      {links.map(({ label, route, icon }) => (
        <Link
          key={label}
          href={route}
          target="_blank"
          style={{ color: "inherit" }}
        >
          {icon}
        </Link>
      ))}
    </Box>
  );
}
