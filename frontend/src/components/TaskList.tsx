import React, { useEffect, useState } from "react";
import { getAllTasks, type Task } from "src/api/tasks";
import { TaskItem } from "src/components";
import styles from "src/components/TaskList.module.css";

export interface TaskListProps {
  title: string;
}

export function TaskList({ title }: TaskListProps) {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    // your code here
    getAllTasks().then((result) => {
        if(result.success){
            setTasks(result.data);
        } else {
            alert(result.error);
        }
    })
  }, []);

  return (
    <div className={styles.outer}>
      <span className={styles.listTitle}>{title}</span>
      <div className={styles.listContainer}>
        {tasks.length === 0 ? (
          // your code here
          <p> No tasks yet. Add one above to get started</p>
        ) : tasks.map((task) => (
          // your code here
          <TaskItem key={task._id} task={task} />
        ))}
      </div>
    </div>
  );
}