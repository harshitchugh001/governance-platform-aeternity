import React from "react";
import { Navbar, Typography, Collapse, IconButton } from "@material-tailwind/react";

function NavBar() {
  const [openNav, setOpenNav] = React.useState(false);

  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);

  const navList = (
    <ul className="mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="flex items-center gap-x-2 p-1 font-medium"
      >
        <svg
          width="16"
          height="15"
          viewBox="0 0 16 15"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M13 14H14V7H16V15H2V7H4V14H5V5L8 2L11 5V14H13ZM9 2.719V5H7V2.719L8 1.29L9 2.719ZM15 1.5H0V0H15V1.5Z"
            fill="#1F2937"
          />
        </svg>

        <a href="/" className="flex items-center">
          Home
        </a>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="flex items-center gap-x-2 p-1 font-medium"
      >
        <svg
          width="16"
          height="15"
          viewBox="0 0 16 15"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M8 0C3.589 0 0 3.589 0 8s3.589 8 8 8 8-3.589 8-8-3.589-8-8-8zm.5 12.785c-.208 0-.416-.079-.577-.232l-6.085-6.085c-.318-.318-.318-.835 0-1.153.318-.318.835-.318 1.153 0l5.508 5.508 5.508-5.508c.318-.318.835-.318 1.153 0 .318.318.318.835 0 1.153l-6.662 6.661c-.161.153-.369.232-.577.232z"
            fill="#1F2937"
          />
        </svg>

        <a href="/votes" className="flex items-center">
          Check votes
        </a>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="flex items-center gap-x-2 p-1 font-medium"
      >
        <svg
          width="16"
          height="15"
          viewBox="0 0 16 15"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M1.242 1.242C1.633 0.852 2.267 0.852 2.658 1.243L14.192 12.777C14.583 13.168 14.583 13.802 14.192 14.193C13.801 14.584 13.167 14.584 12.776 14.193L1.242 2.659C0.852 2.268 0.852 1.634 1.242 1.243V1.242ZM2.658 2.658L2.975 2.975L8.707 8.707L14.439 2.975L14.756 2.658L2.658 14.757H2.658V2.658ZM9 7V1H7V7H1V9H7V15H9V9H15V7H9Z"
            fill="#1F2937"
          />
        </svg>
        <a href="/Submit" className="flex items-center">
          Submit Your Proposal
        </a>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="flex items-center gap-x-2 p-1 font-medium"
      >
        <svg
          width="16"
          height="15"
          viewBox="0 0 16 15"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M8 0C3.589 0 0 3.589 0 8s3.589 8 8 8 8-3.589 8-8-3.589-8-8-8zm.5 12.785c-.208 0-.416-.079-.577-.232l-6.085-6.085c-.318-.318-.318-.835 0-1.153.318-.318.835-.318 1.153 0l5.508 5.508 5.508-5.508c.318-.318.835-.318 1.153 0 .318.318.318.835 0 1.153l-6.662 6.661c-.161.153-.369.232-.577.232z"
            fill="#1F2937"
          />
        </svg>
        <a href="/Process" className="flex items-center">
          Process Proposal
        </a>
      </Typography>
    </ul>
  );

  return (
    <Navbar className="mx-auto px-4 py-2 lg:px-8 lg:py-4 bg-blue-500 scale-120">
    <div className="container mx-auto flex items-center justify-between text-white">
      <Typography
        as="a"
        href="#"
        className="mr-4 cursor-pointer py-1.5 font-medium"
      >
        GoPlat
      </Typography>
      <div className="hidden lg:flex">{navList}</div>

      <IconButton
        variant="text"
        className="ml-auto h-6 w-6 text-white hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
        ripple={false}
        onClick={() => setOpenNav(!openNav)}
      >
        {openNav ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            className="h-6 w-6"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        )}
      </IconButton>
    </div>
    <Collapse open={openNav}>
      <div className={`container mx-auto lg:hidden`}>{navList}</div>
    </Collapse>
  </Navbar>
  );
}

export default NavBar;