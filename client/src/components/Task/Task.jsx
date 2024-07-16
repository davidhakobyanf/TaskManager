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
    const [editTask, setEditTask] = useState({ index: -1, title: '', description: '', priority: 'Low', progress: 0 });
    const [isAddDialogOpen, setAddDialogOpen] = useState(false);
    const [isEditDialogOpen, setEditDialogOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const isMobile = window.innerWidth <= 600;

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const fetchedTasks = await DataApi.getAllTasks();
                setTasks(fetchedTasks);
            } catch (error) {
                console.error('Error fetching tasks:', error);
            }
        };
        fetchTasks();
    }, []);

    const [fetchTask, loadingTask, errorTask] = useFetching(async (newTask) => {
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
            await DataApi.deleteTask(taskIdToDelete);
        } catch (error) {
            console.error('Error deleting task:', error);
        }
    });

    const priorityOrder = { Low: 3, Normal: 2, High: 1 };

    const handleOpenAddDialog = () => setAddDialogOpen(true);
    const handleCloseAddDialog = () => setAddDialogOpen(false);
    const handleOpenEditDialog = (index) => {
        const task = tasks[index];
        setEditTask({ index, ...task });
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
            fetchTask(taskToAdd);
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
            const newTasks = [...tasks];
            newTasks[editTask.index] = updatedTask;
            setTasks(newTasks);
            updateTask(updatedTask);
            handleCloseEditDialog();
        }
    };

    const handleDeleteTask = async (taskIdToDelete) => {
        try {
            await deleteTask(taskIdToDelete);
            const newTasks = tasks.filter((task) => task.id !== taskIdToDelete);
            setTasks(newTasks);
        } catch (error) {
            console.error('Error deleting task:', error);
        }
    };

    const handleToggleComplete = (index) => {
        const newTasks = [...tasks];
        newTasks[index] = {
            ...newTasks[index],
            completed: !newTasks[index].completed,
        };
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
                                    .map((task, index) => (
                                        <TableRow key={task.id} style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
                                            <TableCell>
                                                <Checkbox
                                                    checked={task.completed || false}  // Ensure task.completed is defined
                                                    onChange={() => handleToggleComplete(index)}
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
                                                <IconButton edge="end" aria-label="edit" onClick={() => handleOpenEditDialog(index)}>
                                                    <EditIcon />
                                                </IconButton>
                                                <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteTask(task.id)}>
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
                    <DialogContentText>
                        Please enter the title, description, priority, and progress for the new task.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Title"
                        type="text"
                        fullWidth
                        value={newTask.title}
                        onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                    />
                    <TextField
                        margin="dense"
                        label="Description"
                        type="text"
                        fullWidth
                        value={newTask.description}
                        onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                    />
                    <FormControl fullWidth margin="normal">
                        <InputLabel id="priority-label">Priority</InputLabel>
                        <Select
                            labelId="priority-label"
                            value={newTask.priority}
                            onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}
                        >
                            <MenuItem value="Low">Low</MenuItem>
                            <MenuItem value="Normal">Normal</MenuItem>
                            <MenuItem value="High">High</MenuItem>
                        </Select>
                    </FormControl>
                    <Box margin="dense">
                        <Typography gutterBottom>Progress</Typography>
                        <Slider
                            value={newTask.progress}
                            onChange={(e, newValue) => setNewTask({ ...newTask, progress: newValue })}
                            valueLabelDisplay="auto"
                            step={10}
                            marks
                            min={0}
                            max={100}
                        />
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseAddDialog} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleAddTask} color="primary">
                        Add
                    </Button>
                </DialogActions>
            </Dialog>
            {/* Edit Task Dialog */}
            <Dialog fullScreen={isMobile} open={isEditDialogOpen} onClose={handleCloseEditDialog}>
                <DialogTitle>Edit Task</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Please update the title, description, priority, and progress for the task.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Title"
                        type="text"
                        fullWidth
                        value={editTask.title}
                        onChange={(e) => setEditTask({ ...editTask, title: e.target.value })}
                    />
                    <TextField
                        margin="dense"
                        label="Description"
                        type="text"
                        fullWidth
                        value={editTask.description}
                        onChange={(e) => setEditTask({ ...editTask, description: e.target.value })}
                    />
                    <FormControl fullWidth margin="normal">
                        <InputLabel id="priority-label">Priority</InputLabel>
                        <Select
                            labelId="priority-label"
                            value={editTask.priority}
                            onChange={(e) => setEditTask({ ...editTask, priority: e.target.value })}
                        >
                            <MenuItem value="Low">Low</MenuItem>
                            <MenuItem value="Normal">Normal</MenuItem>
                            <MenuItem value="High">High</MenuItem>
                        </Select>
                    </FormControl>
                    <Box margin="dense">
                        <Typography gutterBottom>Progress</Typography>
                        <Slider
                            value={editTask.progress}
                            onChange={(e, newValue) => setEditTask({ ...editTask, progress: newValue })}
                            valueLabelDisplay="auto"
                            step={10}
                            marks
                            min={0}
                            max={100}
                        />
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseEditDialog} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleUpdateTask} color="primary">
                        Update
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default Task;
