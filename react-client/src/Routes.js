import React, { lazy, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  useRouteMatch,
} from "react-router-dom";

const ChangePassword = lazy(() => import("./components/Auth/ChangePassword"));
const Login = lazy(() => import("./components/Auth/Login"));
const Register = lazy(() => import("./components/Auth/Register"));
const Dashboard = lazy(() => import("./components/Admin/Dashboard"));
const Products = lazy(() => import("./components/Admin/Products/Products"));
const Employees = lazy(() => import("./components/Admin/Employees/Employees"));

const UserDashboard = lazy(() => import("./components/User/UserDashboard"));

const EmployeeDashboard = lazy(() =>
  import("./components/Employee/EmployeeDashboard")
);
const OrderStatus = lazy(() => import("./components/Employee/OrderStatus"));
const Orders = lazy(() => import("./components/User/Orders"));

const NotFound = lazy(() => import("./NotFound"));

// const DashboardRouteWrapper = () => {
//     let { path, url } = useRouteMatch();

//     return (
//         <Switch>
//             <Route exact path={path}>
//                 <Dashboard />
//             </Route>
//             <Route exact path={`${path}/monitor/:testId`}>
//                 <MonitorTest />
//             </Route>
//         </Switch>
//     );
// };

// const TestPanelRoutesWrapper = () => {
//     let { path, url } = useRouteMatch();

//     return (
//         <Switch>
//             <Route exact path={`${path}/auth/:testCode`}>
//                 <TestPanelWelcome />
//             </Route>
//             <Route exact path={`${path}/attempt/ongoing`}>
//                 <TestPanelArena />
//             </Route>
//             <Route exact path={`${path}/attempt/result`}>
//                 <TestPanelResult />
//             </Route>
//         </Switch>
//     );
// };

// const TestsRouteWrapper = ({ userType }) => {
//     let { path, url } = useRouteMatch();

//     return (
//         <Switch>
//             <Route exact path={path}>
//                 {userType === userRoleEnum.Candidate ? (
//                     <StudentDashboard />
//                 ) : (
//                     <Test />
//                 )}
//             </Route>
//             <Route exact path={`${path}/:id`}>
//                 {userType === userRoleEnum.Candidate ? (
//                     <StudentLayout>
//                         <StudentTest />
//                     </StudentLayout>
//                 ) : (
//                     <EditTest />
//                 )}
//             </Route>
//             <Route
//                 exact
//                 path={`${path}/preview/:id`}
//                 render={(props) => <EditTest {...props} previewMode />}
//             />
//         </Switch>
//     );
// };

// const ResultsRouteWrapper = () => {
//     let { path, url } = useRouteMatch();

//     return (
//         <Switch>
//             <Route exact path={path}>
//                 <AdminResult />
//             </Route>
//             <Route exact path={`${path}/:testId`}>
//                 <TestResult />
//             </Route>
//             <Route exact path={`${path}/paper/:attemptId`}>
//                 <AttemptAnalysis />
//             </Route>
//         </Switch>
//     );
// };
// const QBRouteWrapper = () => {
//     let { path, url } = useRouteMatch();

//     return (
//         <Switch>
//             <Route exact path={path}>
//                 <QuestionBank />
//             </Route>
//             <Route exact path={`${path}/set-categories`}>
//                 <QuestionBankCategories />
//             </Route>
//         </Switch>
//     );
// };

const AdminRoutes = ({ userType, user }) => {
  let { path, url } = useRouteMatch();
  return (
    <Switch>
      <Route path={`${path}/dashboard`}>
        <Dashboard userType={userType} user={user} />
      </Route>
      <Route exact path={`${path}/products`}>
        <Products />
      </Route>
      <Route exact path={`${path}/employees`}>
        <Employees />
      </Route>
      {/* <Route exact path={`${path}/groups`}>
                <Groups />
            </Route>
            <Route path={`${path}/test`}>
                <TestsRouteWrapper userType={userType} />
            </Route>
            <Route path={`${path}/results`}>
                <ResultsRouteWrapper userType={userType} />
            </Route>
            <Route path={`${path}/qb`}>
                <QBRouteWrapper />
            </Route>
            <Route path="*">
                <Redirect to={`${path}/dashboard`} />
            </Route> */}
    </Switch>
  );
};

const UserRoutes = ({ userType, user }) => {
  let { path, url } = useRouteMatch();
  return (
    <Switch>
      <Route path={`${path}/dashboard`}>
        <UserDashboard userType={userType} user={user} />
      </Route>
      <Route exact path={`${path}/order`}>
        <Orders />
      </Route>
      {/* <Route exact path={`${path}/results/:attemptId`}>
        <AttemptAnalysis />
      </Route>
      <Route path="*">
        <Redirect to={`${path}/test`} />
      </Route> */}
    </Switch>
  );
};

const EmployeeRoutes = ({ userType, user }) => {
  let { path, url } = useRouteMatch();
  return (
    <Switch>
      <Route path={`${path}/dashboard`}>
        <EmployeeDashboard userType={userType} user={user} />
      </Route>
      <Route exact path={`${path}/orderstatus`}>
        <OrderStatus userType={userType} user={user} />
      </Route>
      {/* <Route exact path={`${path}/results/:attemptId`}>
        <AttemptAnalysis />
      </Route>
      <Route path="*">
        <Redirect to={`${path}/test`} />
      </Route> */}
    </Switch>
  );
};

export const userRoles = {
  0: "Admin",
  1: "Employee",
  2: "User",
};

export const userRoleEnum = {
  Admin: "Admin",
  Employee: "Employee",
  User: "User",
};

export const AuthContext = React.createContext({
  user: null,
  login: () => {},
  logout: () => {},
});

const Routes = () => {
  //  check if token exists
  let existingUserData = localStorage.getItem("user_data_TCS");
  existingUserData = existingUserData ? JSON.parse(existingUserData) : null;
  const existingUserType = existingUserData
    ? existingUserData.user.user_type
    : null;
  const [user, setUser] = useState(existingUserData);
  const [userType, setUserType] = useState(userRoles[existingUserType]);

  function handleLogin(loginDetails) {
    setUser(loginDetails);
    setUserType(userRoles[loginDetails.user.user_type]);
    localStorage.setItem("user_data_TCS", JSON.stringify(loginDetails));
  }

  function handleLogout() {
    setUser(null);
    setUserType(null);
    localStorage.removeItem("user_data_TCS");
  }

  const PrivateRoute = ({ children, ...rest }) => (
    <Route
      {...rest}
      render={() => (user && user.token ? children : <Redirect to="/login" />)}
    />
  );

  return (
    <Router>
      <Switch>
        <AuthContext.Provider
          value={{
            user,
            login: (value) => handleLogin(value),
            logout: (value) => handleLogout(),
          }}
        >
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/pqr">
            <Register />
          </Route>
          <Route exact path="/changePassword">
            <ChangePassword />
          </Route>

          <PrivateRoute path="/Admin">
            <AdminRoutes userType={userType} user={user} />
          </PrivateRoute>
          <PrivateRoute path="/User">
            <UserRoutes userType={userType} user={user} />
          </PrivateRoute>
          <PrivateRoute path="/Employee">
            <EmployeeRoutes userType={userType} user={user} />
          </PrivateRoute>

          <Route path="/404" exact component={NotFound} />
          <Route path="/" exact>
            <Redirect to="/login" />
          </Route>
        </AuthContext.Provider>
        <Route path="*">
          <Redirect to="/404" />
        </Route>
      </Switch>
    </Router>
  );
};

export default Routes;
