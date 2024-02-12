import React from "react";
import { Typography } from "@material-tailwind/react";

const NavLinks = ({ links }) => {
  return (
    <ul className="mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      {links.map((link, index) => (
        <Typography
          key={index}
          as="li"
          variant="small"
          color="blue-gray"
          className="flex items-center gap-x-2 p-1 font-medium"
        >
          {link.icon}
          <a href={link.href} className="flex items-center">
            {link.text}
          </a>
        </Typography>
      ))}
    </ul>
  );
};

export default NavLinks;
