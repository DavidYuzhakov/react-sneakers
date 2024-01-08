import { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage";
import MainLayout from "./layouts/MainLayout";
import { Loading } from "./components";

const OrdersPage = lazy(
  () => import(/* webpackChunkName: 'order' */ "./pages/OrdersPage")
);
const FavoritesPage = lazy(
  () => import(/* webpackChunkName: "favorites" */ "./pages/FavoritesPage")
);
const NotFound = lazy(
  () => import(/* webpackChunkName: "notFound" */ "./pages/404")
);

function App() {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route path="/" element={<MainLayout />}>
            {/* Outlet */}
            <Route path="" element={<HomePage />} />
            <Route path="profile" element={<OrdersPage />} />
            <Route path="favorites" element={<FavoritesPage />} />
            <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
