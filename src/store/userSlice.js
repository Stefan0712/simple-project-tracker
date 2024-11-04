import { createSlice } from '@reduxjs/toolkit';

// Define initial state
const initialState = {
    userData: {
        id: 1,
        name: 'Stefan',
        settings: {
            theme: 'light'
        },
        projects: [],
    },
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        addProject: (state, action) => {
            state.user.projects.push({
                ...action.payload,
                tasks: [], 
            });
        },
        editProject: (state, action) => {
            const { projectId, updatedProject } = action.payload;
            const project = state.user.projects.find((p) => p.id === projectId);
            if (project) {
                Object.assign(project, updatedProject);
            }
        },
        deleteProject: (state, action) => {
            state.user.projects = state.user.projects.filter(
                (project) => project.id !== action.payload
            );
        },

        addTask: (state, action) => {
            const { projectId, task } = action.payload;
            const project = state.user.projects.find((p) => p.id === projectId);
            if (project) {
                project.tasks.push({ ...task, subtasks: [] });
            }
        },
        editTask: (state, action) => {
            const { projectId, taskId, updatedTask } = action.payload;
            const project = state.user.projects.find((p) => p.id === projectId);
            if (project) {
                const task = project.tasks.find((t) => t.id === taskId);
                if (task) {
                    Object.assign(task, updatedTask);
                }
            }
        },
        deleteTask: (state, action) => {
            const { projectId, taskId } = action.payload;
            const project = state.user.projects.find((p) => p.id === projectId);
            if (project) {
                project.tasks = project.tasks.filter((task) => task.id !== taskId);
            }
        },

        // Subtask actions within a specific task
        addSubtask: (state, action) => {
            const { projectId, taskId, subtask } = action.payload;
            const project = state.user.projects.find((p) => p.id === projectId);
            if (project) {
                const task = project.tasks.find((t) => t.id === taskId);
                if (task) {
                    task.subtasks.push(subtask);
                }
            }
        },
        editSubtask: (state, action) => {
            const { projectId, taskId, subtaskId, updatedSubtask } = action.payload;
            const project = state.user.projects.find((p) => p.id === projectId);
            if (project) {
                const task = project.tasks.find((t) => t.id === taskId);
                if (task) {
                    const subtask = task.subtasks.find((s) => s.id === subtaskId);
                    if (subtask) {
                        Object.assign(subtask, updatedSubtask);
                    }
                }
            }
        },
        deleteSubtask: (state, action) => {
            const { projectId, taskId, subtaskId } = action.payload;
            const project = state.user.projects.find((p) => p.id === projectId);
            if (project) {
                const task = project.tasks.find((t) => t.id === taskId);
                if (task) {
                    task.subtasks = task.subtasks.filter((s) => s.id !== subtaskId);
                }
            }
        },
        changeTheme: (state, action)=>{
            const theme = action.payload;
            state.userData.settings.theme = theme;
        },
        resetUser: (state) => {
            return initialState; // Reset to initial state
        },
    },
});

export const {
    addProject,
    editProject,
    deleteProject,
    addTask,
    editTask,
    deleteTask,
    addSubtask,
    editSubtask,
    deleteSubtask,
    resetUser,
    changeTheme
} = userSlice.actions;

export default userSlice.reducer;
