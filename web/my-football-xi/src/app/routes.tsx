
import { lazy } from "react";

const TeamBuilderPage = lazy(() => import("@/features/team/routes/TeamBuilder"));
const SquadPage = lazy(() => import("@/features/squad-table/routes/SquadTablePage"));
const ManagementPage = lazy(() => import("@/features/team/routes/ManagementPage"));
const TransferHubPage = lazy(() => import("@/features/transfer-hub/routes/TransferHubPage"));
const RumorPage = lazy(() => import("@/features/transfer-hub/routes/RumorPage"));
const LeagueSelectionPage = lazy(() => import("@/features/league-selection/routes/LeagueSelectionPage"));
const TeamSelectionPage = lazy(() => import("@/features/team-selection/routes/TeamSelectionPage"));
const FanInsightsPage = lazy(() => import("@/features/fan-insights/routes/FanInsightsPage"));
const FanPulsePage = lazy(() => import("@/features/fan-pulse/routes/FanPulsePage"));
const NotFoundPage = lazy(() => import("@/shared/components/NotFoundPage"));

const routes = [
  {
    path: "/",
    element: <LeagueSelectionPage />,
  },
  {
    path: "/league/:leagueId",
    element: <TeamSelectionPage />,
  },
  {
    path: "/team/:teamId",
    element: <TeamBuilderPage />,
  },
  {
    path: "/team/:teamId/squad",
    element: <SquadPage />,
  },
  {
    path: "/team/:teamId/management",
    element: <ManagementPage />,
  },
  {
    path: "/team/:teamId/transfer-hub",
    element: <TransferHubPage />,
  },
  {
    path: "/team/:teamId/transfer-hub/rumor/:rumorId",
    element: <RumorPage />,
  },
  {
    path: "/team/:teamId/insights",
    element: <FanInsightsPage />,
  },
  {
    path: "/team/:teamId/fan-pulse",
    element: <FanPulsePage />,
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
];

export default routes;
