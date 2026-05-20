import { useEffect, useState } from "react";

import API from "../services/api";

function Dashboard() {
    const logout = () => {

  localStorage.removeItem("token");

  window.location.href = "/";

};


  const [tasks, setTasks] = useState([]);

  const [formData, setFormData] = useState({
    title: "",
    description: ""
  });

  // fetch tasks
  const fetchTasks = async () => {

    try {

      const response = await API.get("/tasks");

      setTasks(response.data);

    } catch (error) {

      console.log(error);

    }

  };

  // load tasks on page load
  useEffect(() => {

    fetchTasks();

  }, []);

  // handle input
  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

  };

  // create task
  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      await API.post("/tasks", {
        title: formData.title,
        description: formData.description,
        status: "pending"
      });

      setFormData({
        title: "",
        description: ""
      });

      fetchTasks();

    } catch (error) {

      console.log(error);

    }

  };

  // delete task
  const deleteTask = async (id) => {

    try {

      await API.delete(`/tasks/${id}`);

      fetchTasks();

    } catch (error) {

      console.log(error);

    }

  };

  // update task status
  const completeTask = async (id) => {

    try {

      await API.put(`/tasks/${id}`, {
        status: "completed"
      });

      fetchTasks();

    } catch (error) {

      console.log(error);

    }

  };

  return (

    <div style={{ padding: "30px" }}>

     
     <button onClick={logout}>
  Logout
</button>
 <h2>Task Dashboard</h2>

      {/* task form */}

      <form onSubmit={handleSubmit}>

        <input
          type="text"
          name="title"
          placeholder="Task Title"
          value={formData.title}
          onChange={handleChange}
          required
        />

        <br /><br />

        <textarea
          name="description"
          placeholder="Task Description"
          value={formData.description}
          onChange={handleChange}
        />

        <br /><br />

        <button type="submit">
          Add Task
        </button>

      </form>

      <hr />

      {/* task list */}

      {
        tasks.length === 0 ? (

          <p>No tasks available</p>

        ) : (

          tasks.map((task) => (

            <div
              key={task._id}
              style={{
                border: "1px solid gray",
                padding: "10px",
                marginBottom: "10px"
              }}
            >

              <h3>{task.title}</h3>

              <p>{task.description}</p>

              <p>
                Status:
                {" "}
                <b>{task.status}</b>
              </p>

              <button
                onClick={() => completeTask(task._id)}
              >
                Complete
              </button>

              {" "}

              <button
                onClick={() => deleteTask(task._id)}
              >
                Delete
              </button>

            </div>

          ))

        )
      }

    </div>

  );

}

export default Dashboard;
