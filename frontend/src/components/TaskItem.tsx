import { useState } from "react";
import { Link } from "react-router-dom";
import { updateTask } from "src/api/tasks"; // Import updateTask function
import { CheckButton } from "src/components";
import styles from "src/components/TaskItem.module.css";

import type { Task } from "src/api/tasks";

export interface TaskItemProps {
  task: Task;
}

export function TaskItem({ task: initialTask }: TaskItemProps) {
  // New state for task and loading status
  const [task, setTask] = useState<Task>(initialTask);
  const [isLoading, setLoading] = useState<boolean>(false);

  // Handle check/uncheck toggle
  const handleToggleCheck = async () => {
    setLoading(true); // Disable button while waiting for the update

    const updatedTask = {
      ...task,
      isChecked: !task.isChecked,
      assignee: task.assignee ? task.assignee._id : undefined,
    };

    try {
      // Update the task in the backend
      const result = await updateTask(updatedTask);

      if (result.success) {
        // Update local task state with the updated task
        setTask(result.data);
      } else {
        // Handle failure
        alert("Failed to update the task.");
      }
    } catch (error) {
      // Handle errors (e.g., network issues)
      alert("Error occurred while updating the task.");
    } finally {
      setLoading(false); // Re-enable the button
    }
  };

  // Initialize base class
  let textContainerClass = styles.textContainer;
  // Add conditional classes
  if (task.isChecked) {
    textContainerClass += ` ${styles.checked}`;
  }

  return (
    <div className={styles.item}>
      {/* Pass onPress and disabled props to CheckButton */}
      <CheckButton checked={task.isChecked} onPress={handleToggleCheck} disabled={isLoading} />

      <div className={textContainerClass}>
        <Link to={`/task/${task._id}`} className={styles.titleLink}>
          <span className={styles.title}>{task.title}</span>
        </Link>
        {task.description && <span className={styles.description}>{task.description}</span>}
      </div>
    </div>
  );
}
