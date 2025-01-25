import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Button, 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  TextField, 
  DialogActions 
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

const Questions = () => {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState(() => {
    // Initialize from localStorage or default array
    const savedQuestions = localStorage.getItem('questions');
    return savedQuestions ? JSON.parse(savedQuestions) : [
      {
        id: 1,
        title: 'Mathematics Assignment Doubt',
        description: 'Need help solving trigonometry problems from chapter 3',
        author: 'John Doe',
        date: '2024-01-25'
      },
      {
        id: 2,
        title: 'Physics Homework Help',
        description: 'Struggling with understanding the concepts of Newton\'s laws',
        author: 'Jane Smith',
        date: '2024-01-26'
      }
    ];
  });

  const [openDialog, setOpenDialog] = useState(false);
  const [newQuestion, setNewQuestion] = useState({
    title: '',
    description: ''
  });

  // Save questions to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('questions', JSON.stringify(questions));
  }, [questions]);

  const handleAddQuestion = () => {
    const question = {
      id: Date.now(), // Use timestamp for unique ID
      title: newQuestion.title,
      description: newQuestion.description,
      author: 'Current User',
      date: new Date().toISOString().split('T')[0]
    };

    setQuestions([...questions, question]);
    setOpenDialog(false);
    setNewQuestion({ title: '', description: '' });
  };

  const handleQuestionClick = (question) => {
    navigate(`/questions/${question.id}`, { 
      state: { question }  // Pass full question data
    });
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2>Questions</h2>
        <Button 
          variant="contained" 
          color="primary" 
          startIcon={<AddIcon />} 
          onClick={() => setOpenDialog(true)}
        >
          Add Question
        </Button>
      </div>

      {questions.map(question => (
        <div 
          key={question.id} 
          style={{ 
            marginBottom: '20px', 
            border: '1px solid #ddd', 
            padding: '15px', 
            borderRadius: '8px',
            cursor: 'pointer'
          }}
          onClick={() => handleQuestionClick(question)}
        >
          <h3>{question.title}</h3>
          <p>{question.description}</p>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
            <p><strong>Author:</strong> {question.author}</p>
            <p>{question.date}</p>
          </div>
        </div>
      ))}

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Add New Question</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Title"
            fullWidth
            value={newQuestion.title}
            onChange={(e) => setNewQuestion({...newQuestion, title: e.target.value})}
          />
          <TextField
            margin="dense"
            label="Description"
            fullWidth
            multiline
            rows={4}
            value={newQuestion.description}
            onChange={(e) => setNewQuestion({...newQuestion, description: e.target.value})}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button onClick={handleAddQuestion} color="primary">Add</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Questions;