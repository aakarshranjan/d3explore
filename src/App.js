import "./App.css";
import Chart from "./Chart";
import KpiChart from "./KpiChart";
import KpiChart1 from "./KpiChart1";
import PieChart from "./PieChart";
import { StackedBarGraph } from "./StackedBarChart";
import OrgChart from "./OrgChart";
import OrgChart1 from "./OrgChart1";
import OrgChart2 from "./OrgChart2";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        {/* <Chart /> */}
        {/* <KpiChart1 /> */}
        {/* <KpiChart /> */}
        {/* <PieChart /> */}
        {/* <OrgChart /> */}
        {/* <OrgChart1 /> */}
        {/* <OrgChart2 /> */}
        <StackedBarGraph />
      </header>
    </div>
  );
}

export default App;