import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";

import Home from "../views/Home";
import Employee from "../views/Employee";
import CreateEmployee from "../views/CreateEmployee";

export default function Routes() {
  const routes = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/employee/:id",
      element: <Employee />,
    },
    {
      path: "/create",
      element: <CreateEmployee />,
    },
  ]);
  return <RouterProvider router={routes} />;
}
