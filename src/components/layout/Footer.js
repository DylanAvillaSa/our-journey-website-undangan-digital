"use client";
import { usePathname } from "next/navigation";

const Footer = () => {
  const pathname = usePathname();

  if (
    pathname == "/template/template-1-silver" ||
    pathname == "/template/template-2-silver" ||
    pathname == "/template/template-3-silver" ||
    pathname == "/template/template-4-gold" ||
    pathname == "/template/template-5-gold" ||
    pathname == "/template/template-6-gold" ||
    pathname == "/template/template-8-gold" ||
    pathname == "/template/template-9-gold" ||
    pathname == "/template/template-10-gold" ||
    pathname == "/template/template-11-gold" ||
    pathname == "/template/template-12-gold" ||
    pathname == "/template/template-13-platinum" ||
    pathname == "/template/template-14-platinum" ||
    pathname == "/template/template-15-platinum" ||
    pathname == "/template/template-16-platinum"
  ) {
    return null;
  }
  return (
    <footer className="bg-gray-800 text-white py-6 text-center">
      © {new Date().getFullYear()} Our Journey — All Rights Reserved
    </footer>
  );
};

export default Footer;
