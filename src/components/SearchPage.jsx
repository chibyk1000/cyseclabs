import { useContext } from "react";
import GlobalContext from "../context/GlobalContext";
import Spinner from "../shared/Spinner";
import Lab from "./Lab";

function SearchPage() {
  const { searchResults, isLoading } = useContext(GlobalContext);

  console.log(searchResults);

  if (!isLoading && (!searchResults || searchResults.length === 0)) {
    return <h3> No Result Available</h3>;
  }

  return isLoading ? (
    <Spinner />
  ) : (
    <div className="box" style={{ height: "90vh" }}>
      <div className="recent-labs">
        <div className="dashboard-head">
          <h5>Search Result</h5>
        </div>
        <div className="labsGrid">
          {searchResults.map((searchResult) => (
            <Lab room={searchResult} key={searchResult._id} id={searchResult.id} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default SearchPage;

// <NavLink
//               end
//               to="/dashboard/leaderboard"
//               className={({ isActive }) =>
//                 isActive ? "sidemenu-item active" : "sidemenu-item"
//               }
//               onClick={() => handleTab("leadersboard")}
//             >
