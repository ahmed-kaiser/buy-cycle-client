import React from "react";
import useScrollToTop from "../hooks/useScrollToTop";
import useTitle from "../hooks/useTitle";

const Dashboard = () => {
  useScrollToTop();
  useTitle("Dashboard");
  return (
    <div>
      <h1 className="font-medium text-gray-600 text-xl border-b-2 pb-1 border-gray-100">
        Dashboard
      </h1>
    </div>
  );
};

export default Dashboard;
