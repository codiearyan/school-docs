import fs from "fs"
import path from "path"

import { labels, priorities, statuses } from "./data"

const tasks = Array.from({ length: 100 }, (_, index) => {
  const randomId = Math.floor(Math.random() * 9000) + 1000;
  const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
  const randomLabel = labels[Math.floor(Math.random() * labels.length)];
  const randomPriority = priorities[Math.floor(Math.random() * priorities.length)];
  
  // Sample task titles
  const titles = [
    "Implement new feature for user dashboard",
    "Fix critical bug in authentication flow",
    "Update documentation for API endpoints",
    "Optimize database queries",
    "Add unit tests for core functionality",
    "Refactor legacy code components",
    "Design new UI components",
    "Integrate third-party service",
    "Improve error handling",
    "Enhance performance monitoring"
  ];
  
  const randomTitle = titles[Math.floor(Math.random() * titles.length)];

  return {
    id: `TASK-${randomId}`,
    title: randomTitle,
    status: randomStatus?.value,
    label: randomLabel?.value,
    priority: randomPriority?.value,
  };
});

fs.writeFileSync(
  path.join(__dirname, "tasks.json"),
  JSON.stringify(tasks, null, 2)
)

console.log("✅ Tasks data generated.")