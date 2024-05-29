import './App.css';
import axios from "./axiosInstance";
import {useEffect, useState} from "react";

function App() {
  const [data, setData] = useState([]);

  const getData = async () => {
    try {
      const response = await axios.get("/boards");
      setData(response.data);
    } catch (e) {
      console.error(e.response?.data.message);
    }
  }

  const saveData = async () => {
    const name = document.getElementById("name").value;
    const text = document.getElementById("text").value;
    if(name === null || name === undefined || name === "") {
      return alert("name을 입력해 주세요");
    }
    if(text === null || text === undefined || text === "") {
      return alert("text를 입력해 주세요");
    }
    try {
      await axios.post("/boards",
          {name: name, text: text});
      getData();
    } catch (e) {
      console.error(e.response?.data.message);
    }
  }

  const onClickDelete = async (id) => {
    try {
      await axios.delete(`/boards/${id}`);
      getData();
    } catch (e) {
      console.error(e.response?.data.message);
    }
  }

  useEffect(() => {
    getData();
  }, []);

  return (
      <>
        <div className="container">
          <form className="form">
            <input
                type="text"
                placeholder="name"
                id="name"
                style={{width: "100%"}}
            />
            <input
                type="text"
                placeholder="text"
                defaultValue=""
                id="text"
                style={{width: "100%"}}
            />
            <button
                type="submit"
                onClick={saveData}
                style={{width: "300px", margin: "0 auto"}}
            >
              SUBMIT
            </button>
          </form>
          <br/>
          {
            data.map((el, i) =>
                <div key={i} className="data">
                  <div>
                    <b className="name">{el.name}</b>
                    <p className="text">{el.text}</p>
                  </div>
                  <button className="delete" onClick={() => onClickDelete(el.id)}>✕</button>
                </div>
            )
          }
        </div>
      </>
  );
}

export default App;