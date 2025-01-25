import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { 
  Box, 
  Typography, 
  Paper, 
  Container,
  IconButton,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions
} from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import AddIcon from '@mui/icons-material/Add';

const Answers = () => {
  const { questionId } = useParams();
  const location = useLocation();

  const [question, setQuestion] = useState(() => {
    const locationState = location.state?.question;
    const savedQuestions = JSON.parse(localStorage.getItem('questions') || '[]');
    return locationState || 
           savedQuestions.find(q => q.id.toString() === questionId) || 
           { title: 'Question Not Found', description: '' };
  });

  const [answers, setAnswers] = useState(() => {
    const savedAnswers = localStorage.getItem(`answers_${questionId}`);
    return savedAnswers ? JSON.parse(savedAnswers) : [];
  });

  const [userVotes, setUserVotes] = useState(() => {
    const savedVotes = localStorage.getItem(`userVotes_${questionId}`);
    return savedVotes ? JSON.parse(savedVotes) : {};
  });

  useEffect(() => {
    localStorage.setItem(`answers_${questionId}`, JSON.stringify(answers));
  }, [answers, questionId]);

  useEffect(() => {
    localStorage.setItem(`userVotes_${questionId}`, JSON.stringify(userVotes));
  }, [userVotes, questionId]);

  const [openDialog, setOpenDialog] = useState(false);
  const [newAnswer, setNewAnswer] = useState('');

  const handleVote = (answerId, voteType) => {
    setAnswers(answers.map(answer => {
      if (answer.id === answerId) {
        const userVote = userVotes[answerId]; // User's current vote for this answer
        if (userVote === voteType) {
          // User is reversing their vote (remove it)
          setUserVotes({ ...userVotes, [answerId]: null });
          return { ...answer, votes: (answer.votes || 0) - (voteType === 'up' ? 1 : -1) };
        } else if (!userVote) {
          // User hasn't voted yet, allow vote
          setUserVotes({ ...userVotes, [answerId]: voteType });
          return { ...answer, votes: (answer.votes || 0) + (voteType === 'up' ? 1 : -1) };
        } else {
          // User is changing their vote (up to down or vice versa)
          setUserVotes({ ...userVotes, [answerId]: voteType });
          return { ...answer, votes: (answer.votes || 0) + (voteType === 'up' ? 2 : -2) };
        }
      }
      return answer;
    }));
  };

  const handleAddAnswer = () => {
    const answer = {
      id: Date.now(),
      content: newAnswer,
      author: 'Current User',
      votes: 0
    };

    setAnswers([...answers, answer]);
    setOpenDialog(false);
    setNewAnswer('');
  };

  const sortedAnswers = [...answers].sort((a, b) => (b.votes || 0) - (a.votes || 0));

  return (
    <Container maxWidth="sm" sx={{ py: 3 }}>
      <Paper elevation={0} sx={{ mb: 3, p: 2, backgroundColor: '#f5f5f5' }}>
        <Typography variant="h5" sx={{ fontWeight: 600 }}>
          {question.title}
        </Typography>
        <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
          {question.description}
        </Typography>
      </Paper>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="subtitle1">
          Answers ({sortedAnswers.length})
        </Typography>
        <Button 
          variant="contained" 
          color="primary" 
          startIcon={<AddIcon />} 
          onClick={() => setOpenDialog(true)}
        >
          Add Answer
        </Button>
      </Box>

      {sortedAnswers.map((answer) => (
        <Paper 
          key={answer.id} 
          elevation={0} 
          sx={{ 
            mb: 2, 
            p: 2, 
            display: 'flex', 
            alignItems: 'start',
            backgroundColor: '#f9f9f9'
          }}
        >
          <Box 
            sx={{ 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center', 
              mr: 2 
            }}
          >
            <IconButton 
              size="small" 
              onClick={() => handleVote(answer.id, 'up')}
              disabled={userVotes[answer.id] === 'up'}
            >
              <ArrowUpwardIcon fontSize="small" />
            </IconButton>
            <Typography variant="body2">
              {answer.votes || 0}
            </Typography>
            <IconButton 
              size="small" 
              onClick={() => handleVote(answer.id, 'down')}
              disabled={userVotes[answer.id] === 'down'}
            >
              <ArrowDownwardIcon fontSize="small" />
            </IconButton>
          </Box>
          
          <Box flex={1}>
            <Typography variant="body2" sx={{ mb: 1 }}>
              {answer.content}
            </Typography>
            <Typography variant="caption" color="textSecondary">
              Answered by {answer.author}
            </Typography>
          </Box>
        </Paper>
      ))}

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Add New Answer</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Your Answer"
            fullWidth
            multiline
            rows={4}
            value={newAnswer}
            onChange={(e) => setNewAnswer(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button onClick={handleAddAnswer} color="primary">Add</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Answers;
