import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useParams } from "react-router-dom";
import { getTask } from "src/api/tasks";
import { Page } from "src/components";

import styles from "../src/pages/TaskDetail.module.css";

import type { Task } from "src/api/tasks";

export function TaskDetail() {
  const { id } = useParams();
  const [task, setTask] = useState<Task | null>(null);

  useEffect(() => {
    getTask(id as string).then((result) => {
      if (result.success) {
        setTask(result.data);
      }
    });
  }, [id]);

  if (task === null) {
    return (
      <Page>
        <Helmet>
          <title>NoTask | TSE Todos</title>
        </Helmet>
        <div className={styles.title}>
          <p>This Task Does Not Exist</p>
        </div>
      </Page>
    );
  }

  return (
    <Page>
      <Helmet>
        <title>{task.title} | TSE Todos</title>
      </Helmet>

      <Link to="/" className={styles.backLink}>
        Back to home
      </Link>

      <div className={styles.taskDetails}>
        {/* Task Title and Edit Button */}
        <div className={styles.taskHeader}>
          <h1>{task.title}</h1>
          <button
            onClick={() => {
              window.location.href = `/edit-task/${task._id}`;
            }}
            className={styles.editButton}
          >
            <strong>Edit Task</strong>
          </button>
        </div>

        {/* Task Description */}
        <p>{task.description || "No description provided."}</p>
        {/* Assignee */}
        <div className={styles.assigneeRow}>
          <strong>Assignee </strong>
          {typeof task.assignee === "string" ? task.assignee : task.assignee?.name || "User Name"}
        </div>

        {/* Status with Proper Spacing */}
        <div className={styles.statusRow}>
          <strong>Status</strong>
          <span>{task.isChecked ? "Done" : "Incomplete"}</span>
        </div>

        {/* Date Created */}
        <div className={styles.dateRow}>
          <strong> Date Created </strong>
          {task.dateCreated ? new Date(task.dateCreated).toLocaleString() : "Unknown"}
        </div>
      </div>
    </Page>
  );
}
