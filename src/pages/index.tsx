/* eslint-disable jsx-a11y/anchor-is-valid */
import { Badge, Dropdown, Table, useTheme } from "flowbite-react";
import type { FC } from "react";
import NavbarSidebarLayout from "../layouts/navbar-sidebar";
import "regenerator-runtime";
import Dictaphone from "../components/dictaphone";

const DashboardPage: FC = function () {
  return (
    <NavbarSidebarLayout>
      <div className="px-4 pt-6">
        <div className="rounded-lg bg-white p-4 shadow dark:bg-gray-800 sm:p-6 xl:p-8">
          <div className="mb-4 flex items-center justify-center">
            <Dictaphone />
          </div>
        </div>
      </div>
    </NavbarSidebarLayout>
  );
};

export default DashboardPage;
