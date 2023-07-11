import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { sortall } from "./utils/sorting";
import { MdArrowDownward, MdArrowBack, MdArrowUpward } from "react-icons/md";

const headers = [
  { headerName: "train name", fieldName: "trainName", type: "string" },
  { headerName: "duration", fieldName: "duration", type: "time" },
  { headerName: "train number", fieldName: "trainNumber", type: "int" },
  { headerName: "distance", fieldName: "distance", type: "int" },
];
function App() {
  const [trains, setTrains] = useState([]);
  const [sort, setSort] = useState({
    order: "",
    field: "",
    type: "",
  });
  useEffect(() => {
    async function getalltrains() {
      const data = await axios.get("http://localhost:9000/trains");
      let trainData = data.data.data;
      let t = [];
      setTrains(
        trainData.forEach((d) =>
          t.push({ ...d, distance: d.stations[d.stations.length - 1].distance })
        )
      );
      setTrains([...t]);
    }
    getalltrains();
  }, []);
  console.log(sort, "sort");
  useEffect(() => {
    sortall(trains, sort);
  }, [sort]);
  const handleSort = (p) => {
    setSort({
      field: p.fieldName,
      order: sort.order == "asc" ? "dsc" : "asc",
      type: p.type,
    });
  };
  return (
    <div className="container">
      <table style={{ borderCollapse: "collapse" }}>
        <thead>
          <tr>
            {headers.map((t, key) => {
              return (
                <th key={key} onClick={() => handleSort(t)}>
                  {t.headerName}
                  {sort.field == `${t.fieldName}` && sort.order == "asc" ? (
                    <MdArrowDownward />
                  ) : sort.field == `${t.fieldName}` && sort.order == "dsc" ? (
                    <MdArrowUpward />
                  ) : null}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {trains.length > 0 &&
            trains?.map((t, key) => {
              return (
                <tr key={key}>
                  <td>{t.trainName}</td>
                  <td>{t.duration}</td>
                  <td>{t.trainNumber}</td>
                  <td>{t.distance}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
}

export default App;
