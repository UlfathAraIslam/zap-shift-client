import React from "react";
import { NavLink, Outlet } from "react-router";
import ProfastLogo from "../pages/shared/ProfastLogo/ProfastLogo";
import { FaHome, FaUserEdit, FaHistory, FaUserClock, FaUserCheck } from "react-icons/fa";
import { MdLocalShipping, MdTrackChanges } from "react-icons/md";

const DashboardLayout = () => {
  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />

      {/* ================= Main Content ================= */}
      <div className="drawer-content flex flex-col">
        {/* Navbar */}
        <div className="w-full">
          <div className="flex-none lg:hidden">
            <label
              htmlFor="my-drawer-2"
              aria-label="open sidebar"
              className="btn btn-square btn-ghost"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block h-6 w-6 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </label>
          </div>
          <div className="mx-2 flex-1 px-2 lg:hidden">Dashboard</div>
        </div>

        {/* Page content */}
        <Outlet />
      </div>

      {/* ================= Sidebar ================= */}
      <div className="drawer-side">
        <label
          htmlFor="my-drawer-2"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>

        <ul className="menu bg-base-200 min-h-full w-80 p-4 space-y-1">
          <ProfastLogo />

          <li>
            <NavLink to="/dashboard/home" className="flex items-center gap-3">
              <FaHome className="text-lg" />
              Home
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/dashboard/myParcels"
              className="flex items-center gap-3"
            >
              <MdLocalShipping className="text-lg" />
              My Parcels
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/dashboard/paymentHistory"
              className="flex items-center gap-3"
            >
              <FaHistory className="text-lg" />
              Payment History
            </NavLink>
          </li>

          <li>
            <NavLink to="/dashboard/track" className="flex items-center gap-3">
              <MdTrackChanges className="text-lg" />
              Track a Package
            </NavLink>
          </li>

          {/* ===== Riders Management ===== */}

          <li>
            <NavLink
              to="/dashboard/pendingRiders"
              className="flex items-center gap-3"
            >
              <FaUserClock className="text-lg" />
              Pending Riders
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/dashboard/activeRiders"
              className="flex items-center gap-3"
            >
              <FaUserCheck className="text-lg" />
              Active Riders
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/dashboard/profile"
              className="flex items-center gap-3"
            >
              <FaUserEdit className="text-lg" />
              Update Profile
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default DashboardLayout;
