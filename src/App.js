import './App.css';
import "bootstrap/dist/css/bootstrap.min.css"
import { useState } from 'react';
import "bootstrap-icons/font/bootstrap-icons.css";
let idEdit;
function App() {

  const [tasks, setTasks] = useState([
    { id: 1, task: "đi học", isComplete: false },
    { id: 2, task: "làm bài tập", isComplete: false },
    { id: 3, task: "đi đá bóng", isComplete: false },
    { id: 4, task: "guitar", isComplete: false }
  ]);
  const [newTasks, setNewTasks] = useState("");
  const [editStatus, setEditStatus] = useState(false);
  const addTasks = () => {
    setTasks((preTask) => [...preTask,
    {
      id: preTask[preTask.length - 1].id + 1,
      tasks: newTasks,
      isCOmplete: false
    }
    ]
    )
  }

  const deleteTask = (idDel) => {
    const newTasks = tasks.filter((cur) => cur.id !== idDel)
    setTasks(newTasks)
  }
  const editTask = (taskUpdate, idEdit) => {
    let UpdateArr = [];

    tasks.forEach((cur) => {
      if (cur.id === idEdit) {
        UpdateArr.push({ id: idEdit, task: taskUpdate, isComplete: false })
      } else {
        UpdateArr.push(cur)
      }
    })
    setTasks(UpdateArr);
    setNewTasks("");
    setEditStatus(false)
  }
  const handleCom = (idCom) => {
    let UpdateArr = [];

    tasks.forEach((cur) => {
      if (cur.id === idCom) {
        UpdateArr.push({ id: idCom, task: cur.task, isComplete: true })
      } else {
        UpdateArr.push(cur)
      }
    })
    setTasks(UpdateArr);
    setNewTasks("");
    setEditStatus(false)
  }
  const handleEdit = (idE, taskEdit) => {
    idEdit = idE;
    setEditStatus(true);
    setNewTasks(taskEdit)

  }
  const btn = editStatus ? (
    <button type='button'
      className='btn btn-warning mx-3'
      onClick={() => editTask(newTasks, idEdit)}
    >Update</button>
  ) : (
    <button type='button'
      className='btn btn-primary mx-3'
      onClick={addTasks}>Add</button>
  )



  return (
    <div className="App mx-4" >
      <div>
        <input type='text'
          onChange={(e) => setNewTasks(e.target.value)}
          value={newTasks} />
        {btn}

      </div>
      <table className='table table-striped'>
        <thead>
          <tr>
            <th>Id</th>
            <th>Task</th>
            <th>Status</th>
            <th colSpan={3}>Action</th>
          </tr>
        </thead>
        <tbody>
          {
            tasks.map((cur, index) => {
              return (

                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{cur.task}</td>
                  <td>
                    {cur.isComplete ?
                      <i class="bi bi-check2"></i>
                      :
                      <i class="bi bi-hourglass-bottom"></i>}

                  </td>
                  <td>
                    <button className="btn btn-warning" onClick={() => handleEdit(cur.id, cur.task)}>Edit</button>

                    <button onClick={() => deleteTask(cur.id)} className="btn btn-danger mx-3">Delete</button>

                    <button onClick={() => handleCom(cur.id)}
                      className="btn btn-success">Complete</button>
                  </td>
                </tr>
              )
            })}
        </tbody>
      </table>

    </div>
  );
}

export default App;
