import React, { useEffect, useState } from 'react';
import { KanbanComponent, ColumnsDirective, ColumnDirective } from '@syncfusion/ej2-react-kanban';
import { useNavigate } from 'react-router-dom';

const getUser = () => JSON.parse(localStorage.getItem('kanbanUser'));
const TASKS_KEY = 'kanbanTasks';

const defaultColumns = [
  { headerText: 'To Do', keyField: 'Open' },
  { headerText: 'In Progress', keyField: 'InProgress' },
  { headerText: 'Testing', keyField: 'Testing' },
  { headerText: 'Done', keyField: 'Close' },
];

const Kanban = () => {
  const [tasks, setTasks] = useState([]);
  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm] = useState({ title: '', description: '', dueDate: '', assignee: '' });
  const [users, setUsers] = useState([]);
  const user = getUser();
  const navigate = useNavigate();

  useEffect(() => {
    // Load tasks from localStorage
    const stored = JSON.parse(localStorage.getItem(TASKS_KEY)) || [];
    setTasks(stored);
    // For demo: collect all users who ever logged in
    const allUsers = JSON.parse(localStorage.getItem('kanbanUsers')) || [];
    if (user && !allUsers.includes(user.email)) {
      allUsers.push(user.email);
      localStorage.setItem('kanbanUsers', JSON.stringify(allUsers));
    }
    setUsers(allUsers);
  }, []);

  // Save tasks to localStorage on change
  useEffect(() => {
    localStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
  }, [tasks]);

  // Filter tasks for current user
  const myTasks = tasks.filter((t) => t.assignee === user?.email);

  const handleAddTask = (e) => {
    e.preventDefault();
    if (!form.title || !form.assignee) return;
    setTasks([
      ...tasks,
      {
        ...form,
        Id: `Task-${Date.now()}`,
        Status: 'Open',
      },
    ]);
    setForm({ title: '', description: '', dueDate: '', assignee: '' });
    setShowAdd(false);
  };

  const cardTemplate = (props) => (
    <div>
      <div className="font-bold">{props.title}</div>
      <div className="text-xs text-gray-500">{props.description}</div>
      <div className="text-xs mt-1">
        <span className="font-semibold">Due:</span> {props.dueDate || 'N/A'}
      </div>
      <div className="text-xs">
        <span className="font-semibold">Assigned:</span> {props.assignee}
      </div>
    </div>
  );

  const onDragStop = (args) => {
    // Update task status in localStorage
    const updated = tasks.map((task) =>
      task.Id === args.data[0].Id ? { ...task, Status: args.data[0].Status } : task
    );
    setTasks(updated);
  };

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Kanban Board</h2>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded"
          onClick={() => setShowAdd(true)}
        >
          Add Task
        </button>
      </div>
      {showAdd && (
        <form className="mb-4 bg-gray-100 p-4 rounded" onSubmit={handleAddTask}>
          <div className="mb-2">
            <input
              className="border px-2 py-1 w-full"
              placeholder="Title"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              required
            />
          </div>
          <div className="mb-2">
            <textarea
              className="border px-2 py-1 w-full"
              placeholder="Description"
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
            />
          </div>
          <div className="mb-2">
            <input
              type="date"
              className="border px-2 py-1 w-full"
              value={form.dueDate}
              onChange={(e) => setForm({ ...form, dueDate: e.target.value })}
            />
          </div>
          <div className="mb-2">
            <select
              className="border px-2 py-1 w-full"
              value={form.assignee}
              onChange={(e) => setForm({ ...form, assignee: e.target.value })}
              required
            >
              <option value="">Assign to...</option>
              {users.map((u) => (
                <option key={u} value={u}>{u}</option>
              ))}
            </select>
          </div>
          <div className="flex gap-2">
            <button type="submit" className="bg-green-600 text-white px-4 py-1 rounded">Add</button>
            <button type="button" className="bg-gray-400 text-white px-4 py-1 rounded" onClick={() => setShowAdd(false)}>Cancel</button>
          </div>
        </form>
      )}
      <KanbanComponent
        id="kanban"
        keyField="Status"
        dataSource={myTasks}
        cardSettings={{ contentField: 'description', headerField: 'title', template: cardTemplate }}
        dragStop={onDragStop}
      >
        <ColumnsDirective>
          {defaultColumns.map((col) => (
            <ColumnDirective key={col.keyField} {...col} />
          ))}
        </ColumnsDirective>
      </KanbanComponent>
    </div>
  );
};

export default Kanban;