import './App.css';
import {boardAxiosInstance, cmmtAxiosInstance} from "./axiosInstance";
import {useEffect, useState} from "react";

function App() {
  // BOARD DATA
  const [boardData, setBoardData] = useState([]);
  // COMMENT DATA
  const [cmmtData, setCmmtData] = useState([]);
  // TOGGLE
  const [toggle, setToggle] = useState(Array(boardData.length).fill(false));

  // GET BOARD
  const getBoardData = async () => {
    try {
      const response = await boardAxiosInstance.get("/boards");
      setBoardData(response.data);
    } catch (e) {
      console.error(e.response?.data.message);
    }
  }
  // POST BOARD
  const saveBoardData = async () => {
    const name = document.getElementById("name").value;
    const text = document.getElementById("text").value;
    if(name === null || name === undefined || name === "") {
      return alert("작성자명을 입력해 주세요");
    }
    if(text === null || text === undefined || text === "") {
      return alert("내용을 입력해 주세요");
    }
    try {
      await boardAxiosInstance.post("/boards",
          {name: name, text: text});
      document.getElementById("name").value = '';
      document.getElementById("text").value = '';
    } catch (e) {
      console.error(e.message);
    }
    await getBoardData();
  }
  // DELETE BOARD
  const onClickBoardDelete = async (id) => {
    try {
      await boardAxiosInstance.delete(`/boards/${id}`);
    } catch (e) {
      console.error(e.response?.data.message);
    }
    await getBoardData();
  }

  // TOGGLE
  const toggleCmmt = (el, i) => {
    const click = [...toggle];
    click[i] = !toggle[i];
    // if (click[i] === true) getCmmtData(el.id);
    setToggle(click);
  }
  // GET COMMENT
  const getCmmtData = async (id) => {
    try {
      // const response = await axios.get(`/${id}/comments`);
      const response = await cmmtAxiosInstance.get(`/comments`);
      setCmmtData(response.data);
    } catch (e) {
      console.error(e.response?.data.message);
    }
  }
  // POST COMMENT
  const saveCmmtData = async (id, i) => {
    const text = document.getElementById(`cmmtText${i}`).value;
    if(text === null || text === undefined || text === "") {
      return alert("댓글을 입력해 주세요");
    }
    try {
      await cmmtAxiosInstance.post(`/${id}/comments`, { boardId: id, text: text });
      document.getElementById(`cmmtText${i}`).value = '';
    } catch (e) {
      console.error(e.message);
    }
    await getCmmtData();
  }
  // DELETE COMMENT
  const onClickCmmtDelete = async (bid, id) => {
    try {
      await cmmtAxiosInstance.delete(`/${bid}/comments/${id}`);
    } catch (e) {
      console.error(e.response?.data.message);
    }
    await getCmmtData();
  }

  useEffect(() => {
    getBoardData();
    getCmmtData();
  }, []);

  return (
    <>
      <div className="container">
        <div className="form">
          <h1>미람 게시판</h1>
          <br/>
          <input
              type="text"
              placeholder="작성자명"
              id="name"
              style={{width: "100%"}}
          />
          <input
              type="text"
              placeholder="내용"
              id="text"
              style={{width: "100%"}}
          />
          <button onClick={saveBoardData}>SUBMIT</button>
        </div>
        <br/>
        <div className="boardList">
          {
            boardData.map((boardItem, i) =>
              <div key={i} className="data">
                <div className="board">
                  <div className="name">
                    <b>{boardItem.name}</b>
                    <button
                        className="delete"
                        onClick={() => onClickBoardDelete(boardItem.id)}
                    >
                      ✕
                    </button>
                  </div>
                  <p className="text">{boardItem.text}</p>
                </div>
                <div className="button">
                  <button
                      onClick={() => toggleCmmt(boardItem, i)}
                  >
                    댓글 {toggle[i] === true ? '숨기기' : '펼치기'}
                  </button>
                </div>
                {
                  toggle[i] === true ?
                  <div className="commentWrap">
                    <ul>
                      {
                          cmmtData
                              .filter(cmmtItem => boardItem.id === cmmtItem.boardId)
                              .map((cmmtItem, i) =>
                              <li key={i} className="comment">
                                <p>{cmmtItem.text}</p>
                                <button
                                    className="commentDelete"
                                    onClick={() => onClickCmmtDelete(cmmtItem.boardId, cmmtItem.id)}
                                >
                                  ✕
                                </button>
                              </li>
                          )
                      }
                    </ul>
                    <div className="inputComment">
                      <input type="text" id={`cmmtText${i}`} placeholder="댓글" />
                      <button onClick={() => saveCmmtData(boardItem.id, i)}>등록</button>
                    </div>
                  </div>
                  : <></>
                }
              </div>
            )
          }
        </div>
      </div>
    </>
  );
}

export default App;