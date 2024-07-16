import React, { useState, useEffect } from 'react';
import {
    Button,
    Checkbox,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    FormControl,
    IconButton,
    InputLabel,
    LinearProgress,
    MenuItem,
    Paper,
    Select,
    Slider,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
    TextField,
    Typography,
    Box,
    Card,
    CardContent,
    CardActions,
} from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon, Add as AddIcon, Search as SearchIcon } from '@mui/icons-material';
import { v4 as uuidv4 } from 'uuid';
import { useFetching } from '../../hoc/fetchingHook';
import DataApi from '../../api/api.js';

const Task = () => {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState({ title: '', description: '', priority: 'Low', progress: 0 });
    const [editTask, setEditTask] = useState({ title: '', description: '', priority: 'Low', progress: 0 });
    const [taskToDelete, setTaskToDelete] = useState(null);
    const [isAddDialogOpen, setAddDialogOpen] = useState(false);
    const [isEditDialogOpen, setEditDialogOpen] = useState(false);
    const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const isMobile = window.innerWidth <= 600;

    useEffect(() => {
        fetchTasks();
    }, [isAddDialogOpen, isEditDialogOpen, isDeleteDialogOpen]);

    const fetchTasks = async () => {
        try {
            const { data: res } = await DataApi.fetchTasks();
            if (res) {
                setTasks(res);
            }
        } catch (error) {
            console.error('Error fetching profile:', error);
        }
    };

    const [addTask, loadingTask, errorTask] = useFetching(async (newTask) => {
        try {
            const { data: res } = await DataApi.addTask(newTask);
            console.log(res, 'Response after adding task');
        } catch (error) {
            console.error(error);
        }
    });

    const [updateTask, loadingUpdate, errorUpdate] = useFetching(async (updatedTask) => {
        try {
            const { data: res } = await DataApi.updateTask(updatedTask);
            console.log(res, 'Response after updating task');
        } catch (error) {
            console.error(error);
        }
    });

    const [deleteTask, loadingDelete, errorDelete] = useFetching(async (taskIdToDelete) => {
        try {
            const { data: res } = await DataApi.deleteTask(taskIdToDelete);
            if (res) {
                console.log(res, 'res');
            }
        } catch (error) {
            console.error('Error fetching profile:', error);
        }
    });

    const priorityOrder = { Low: 3, Normal: 2, High: 1 };

    const handleOpenAddDialog = () => setAddDialogOpen(true);
    const handleCloseAddDialog = () => setAddDialogOpen(false);
    const handleOpenEditDialog = (taskId) => {
        const task = tasks.find((task) => task.id === taskId);
        setEditTask({ ...task });
        setEditDialogOpen(true);
    };
    const handleCloseEditDialog = () => setEditDialogOpen(false);

    const handleAddTask = () => {
        if (newTask.title.trim() && newTask.description.trim()) {
            const taskToAdd = {
                id: uuidv4(),
                ...newTask,
                progress: newTask.progress,
            };
            setTasks([...tasks, taskToAdd]);
            addTask(taskToAdd);
            setNewTask({ title: '', description: '', priority: 'Low', progress: 0 });
            handleCloseAddDialog();
        }
    };

    const handleUpdateTask = () => {
        if (editTask.title.trim() && editTask.description.trim()) {
            const updatedTask = {
                ...editTask,
                progress: editTask.progress,
            };
            updateTask(updatedTask);
            handleCloseEditDialog();
        }
    };

    const handleOpenDeleteDialog = (taskId) => {
        const task = tasks.find((task) => task.id === taskId);
        setTaskToDelete(task);
        setDeleteDialogOpen(true);
    };

    const handleCloseDeleteDialog = () => {
        setTaskToDelete(null);
        setDeleteDialogOpen(false);
    };

    const handleDeleteTask = async () => {
        if (taskToDelete) {
            try {
                await deleteTask(taskToDelete.id);
                setTaskToDelete(null);
                setDeleteDialogOpen(false);
            } catch (error) {
                console.error('Error deleting task:', error);
            }
        }
    };

    const handleToggleComplete = (taskId) => {
        const newTasks = tasks.map((task) =>
            task.id === taskId ? { ...task, completed: !task.completed } : task
        );
        setTasks(newTasks);
    };

    const handleChangePage = (event, newPage) => setPage(newPage);
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const getProgressColor = (progress) => {
        const progressValue = parseInt(progress, 10);
        if (progressValue <= 35) return 'error';
        if (progressValue <= 65) return 'warning';
        return 'success';
    };

    const filteredTasks = tasks.filter((task) =>
        task.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div style={{ padding: 20 }}>
            <Typography style={{ color: '#3f51b5', fontWeight: 'bold' }} variant="h4" gutterBottom>
                Task Management
            </Typography>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                <Button variant="contained" color="primary" startIcon={<AddIcon />} onClick={handleOpenAddDialog}>
                    Add Task
                </Button>
                <TextField
                    label="Search by title"
                    variant="outlined"
                    size="small"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    InputProps={{
                        endAdornment: <SearchIcon />
                    }}
                />
            </Box>
            <Card>
                <CardContent>
                    <TableContainer component={Paper}>
                        <Table stickyHeader>
                            <TableHead>
                                <TableRow>
                                    <TableCell style={{ minWidth: 80 }}>Complete</TableCell>
                                    <TableCell style={{ minWidth: 100 }}>Title</TableCell>
                                    <TableCell style={{ minWidth: 150 }}>Description</TableCell>
                                    <TableCell style={{ minWidth: 80 }}>Priority</TableCell>
                                    <TableCell style={{ minWidth: 100 }}>Progress</TableCell>
                                    <TableCell style={{ minWidth: 100 }}>Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {filteredTasks
                                    .sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority])
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((task) => (
                                        <TableRow key={task.id} style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
                                            <TableCell>
                                                <Checkbox
                                                    checked={task.completed || false}  // Ensure task.completed is defined
                                                    onChange={() => handleToggleComplete(task.id)}
                                                />
                                            </TableCell>
                                            <TableCell>{task.title}</TableCell>
                                            <TableCell>{task.description}</TableCell>
                                            <TableCell>{task.priority}</TableCell>
                                            <TableCell>
                                                <LinearProgress
                                                    variant="determinate"
                                                    value={parseInt(task.progress, 10)}
                                                    style={{ width: '80%', marginLeft: '10px' }}
                                                    color={getProgressColor(task.progress)}
                                                />
                                            </TableCell>
                                            <TableCell>
                                                <IconButton edge="end" aria-label="edit" onClick={() => handleOpenEditDialog(task.id)}>
                                                    <EditIcon />
                                                </IconButton>
                                                <IconButton edge="end" aria-label="delete" onClick={() => handleOpenDeleteDialog(task.id)}>
                                                    <DeleteIcon />
                                                </IconButton>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                            </TableBody>
                        </Table>
                        <TablePagination
                            rowsPerPageOptions={[5, 10, 15]}
                            component="div"
                            count={filteredTasks.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                        />
                    </TableContainer>
                </CardContent>
            </Card>
            {/* Add Task Dialog */}
            <Dialog fullScreen={isMobile} open={isAddDialogOpen} onClose={handleCloseAddDialog}>
                <DialogTitle>Add Task</DialogTitle>
                <DialogContent>
                    <DialogContentText>To add a new task, please fill out the form below.</DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Title"
                        fullWidth
                        value={newTask.title}
                        onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                    />
                    <TextField
                        margin="dense"
                        label="Description"
                        fullWidth
                        multiline
                        rows={4}
                        value={newTask.description}
                        onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                    />
                    <FormControl fullWidth margin="dense">
                        <InputLabel>Priority</InputLabel>
                        <Select
                            value={newTask.priority}
                            onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}
                        >
                            <MenuItem value="Low">Low</MenuItem>
                            <MenuItem value="Normal">Normal</MenuItem>
                            <MenuItem value="High">High</MenuItem>
                        </Select>
                    </FormControl>
                    <Box mt={2}>
                        <Typography gutterBottom>Progress</Typography>
                        <Slider
                            value={newTask.progress}
                            onChange={(e, value) => setNewTask({ ...newTask, progress: value })}
                            aria-labelledby="progress-slider"
                            valueLabelDisplay="auto"
                        />
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseAddDialog} color="primary">Cancel</Button>
                    <Button onClick={handleAddTask} color="primary">Add</Button>
                </DialogActions>
            </Dialog>
            {/* Edit Task Dialog */}
            <Dialog fullScreen={isMobile} open={isEditDialogOpen} onClose={handleCloseEditDialog}>
                <DialogTitle>Edit Task</DialogTitle>
                <DialogContent>
                    <DialogContentText>To edit the task, please modify the form below.</DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Title"
                        fullWidth
                        value={editTask.title}
                        onChange={(e) => setEditTask({ ...editTask, title: e.target.value })}
                    />
                    <TextField
                        margin="dense"
                        label="Description"
                        fullWidth
                        multiline
                        rows={4}
                        value={editTask.description}
                        onChange={(e) => setEditTask({ ...editTask, description: e.target.value })}
                    />
                    <FormControl fullWidth margin="dense">
                        <InputLabel>Priority</InputLabel>
                        <Select
                            value={editTask.priority}
                            onChange={(e) => setEditTask({ ...editTask, priority: e.target.value })}
                        >
                            <MenuItem value="Low">Low</MenuItem>
                            <MenuItem value="Normal">Normal</MenuItem>
                            <MenuItem value="High">High</MenuItem>
                        </Select>
                    </FormControl>
                    <Box mt={2}>
                        <Typography gutterBottom>Progress</Typography>
                        <Slider
                            value={editTask.progress}
                            onChange={(e, value) => setEditTask({ ...editTask, progress: value })}
                            aria-labelledby="progress-slider"
                            valueLabelDisplay="auto"
                        />
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseEditDialog} color="primary">Cancel</Button>
                    <Button onClick={handleUpdateTask} color="primary">Update</Button>
                </DialogActions>
            </Dialog>
            {/* Delete Task Dialog */}
            <Dialog open={isDeleteDialogOpen} onClose={handleCloseDeleteDialog}>
                <DialogTitle>Delete Task</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to delete the task titled '{taskToDelete?.title}'?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDeleteDialog} color="primary">Cancel</Button>
                    <Button onClick={handleDeleteTask} color="primary">Delete</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default Task;
