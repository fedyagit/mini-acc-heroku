import React, { FC, FunctionComponent } from "react";
import Link from "next/Link";
import { useRouter } from "next/router";

const pages: page[] = [
  {
    title: "Меню",
    path: "menu",
  },
  {
    title: "Змінити меню",
    path: "edit",
  },
  {
    title: "Історія",
    path: "history",
  },
  {
    title: "Підсумок дня",
    path: "daily-results",
  },
];

interface NavProps {
  pages: page[];
  currentPath: string;
}

interface page {
  title: string;
  path: string;
}

const Header: FunctionComponent = () => {
  const router = useRouter();
  const currentPath = router.asPath;

  return (
    <nav className="bg-black">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-16">
          <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
            <Link href="/home">
              <div className="flex-shrink-0 cursor-pointer uppercase text-gray-300 hover:text-white border-b font-mono flex items-center">
                Смачна зустріч
              </div>
            </Link>
            <div className="hidden sm:block sm:ml-6">
              <div className="flex space-x-4">
                <NavItems {...{ pages: pages, currentPath: currentPath }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;

const NavItems: FC<NavProps> = ({ pages, currentPath }) => (
  <>
    {pages?.map(({ title, path }, index) => (
      <Link href={`/${path}`} key={index}>
        <span
          className={
            currentPath === "/" + path
              ? "bg-white cursor-pointer text-black px-3 py-2 rounded-md text-sm font-medium"
              : "text-gray-300 cursor-pointer hover:bg-black hover:text-white px-3 py-2 rounded-md text-sm font-medium"
          }
        >
          {title}
        </span>
      </Link>
    ))}
  </>
);
