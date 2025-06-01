/**
 * VPL for CS Educators - Readiness Quiz
 * Helps teachers assess their readiness to implement VPL
 */

document.addEventListener('DOMContentLoaded', () => {
  // Quiz elements
  const quizQuestions = document.querySelectorAll('.quiz-question');
  const prevButton = document.getElementById('prev-button');
  const nextButton = document.getElementById('next-button');
  const progressFill = document.querySelector('.progress-fill');
  const questionNumber = document.getElementById('question-number');
  const questionPercentage = document.getElementById('question-percentage');
  const quizResult = document.getElementById('quiz-result');
  const scoreValue = document.getElementById('score-value');
  const resultLevel = document.getElementById('result-level');
  const resultDescription = document.getElementById('result-description');
  const resultNextSteps = document.getElementById('result-next-steps');
  const retakeButton = document.getElementById('retake-quiz');
  const questionsContainer = document.getElementById('quiz-questions');

  let currentQuestion = 1;
  const totalQuestions = quizQuestions.length;
  let answers = {};

  // Define the readiness levels
  const readinessLevels = {
    beginner: {
      range: [10, 19],
      title: "Beginner Level",
      description: "You're just starting your VPL journey. While implementing VPL may present some challenges, this website will help you build the necessary skills.",
      expectations: "With your current knowledge, you can implement basic VPL assignments with the Moodle plugin, but may need additional support for advanced features and server setup.",
      impact: "Students will benefit from automated code testing and immediate feedback on simple programming exercises.",
      steps: [
        "Focus on the 'What is VPL?' section to understand core concepts",
        "Start with the basic VPL plugin installation in Moodle",
        "Use our pre-made assignment templates for your first assignments",
        "Consider finding a colleague with more technical experience to help with initial setup",
        "Build your command-line and server knowledge before attempting the jail server setup"
      ]
    },
    intermediate: {
      range: [20, 29],
      title: "Intermediate Level",
      description: "You have a solid foundation for implementing VPL in your classroom. You can handle most aspects of VPL with some guidance.",
      expectations: "You can successfully implement VPL with most features and create effective programming assignments with automated testing.",
      impact: "Students will benefit from a well-structured programming environment with automated grading, plagiarism detection, and immediate feedback.",
      steps: [
        "Follow our implementation guide to set up the VPL plugin and configure settings",
        "Explore the assignment templates to create effective programming exercises",
        "Consider setting up a VPL jail server following our detailed instructions",
        "Use the Modern Classroom section to develop strategies for AI-resistant assignments",
        "Join the VPL community forums to learn advanced techniques from other educators"
      ]
    },
    advanced: {
      range: [30, 35],
      title: "Advanced Level",
      description: "You have the technical skills necessary to fully implement VPL and customize it for your specific teaching needs.",
      expectations: "You can implement all VPL features, including advanced server configurations, and create sophisticated programming assignments.",
      impact: "Students will experience a professional-grade programming environment that prepares them for real-world development scenarios.",
      steps: [
        "Implement the complete VPL environment including the jail server with SSL/TLS",
        "Create custom assignment templates tailored to your curriculum",
        "Develop advanced testing strategies with comprehensive test cases",
        "Consider contributing to the VPL community by sharing your own templates",
        "Explore integrating VPL with other tools and services for enhanced functionality"
      ]
    },
    expert: {
      range: [36, 40],
      title: "Expert Level",
      description: "You have the expertise to implement, customize, and extend VPL to its full potential in your educational environment.",
      expectations: "You can implement all aspects of VPL, troubleshoot complex issues, and even contribute improvements to the system.",
      impact: "Students will benefit from a state-of-the-art programming environment with sophisticated feedback mechanisms and assessment capabilities.",
      steps: [
        "Implement the complete VPL environment with advanced security and optimization",
        "Consider contributing to the VPL open-source project or developing extensions",
        "Create advanced, industry-relevant assignment scenarios with comprehensive testing",
        "Mentor other educators in implementing VPL at their institutions",
        "Develop integration strategies with other learning tools in your institution's ecosystem"
      ]
    }
  };

  // Initialize quiz
  function initQuiz() {
    currentQuestion = 1;
    answers = {};
    showQuestion(currentQuestion);
    updateButtons();
    updateProgress();
    quizResult.classList.remove('show');
    questionsContainer.style.display = 'block';
    nextButton.textContent = 'Next';
    nextButton.classList.remove('submit');
    nextButton.classList.add('next');
  }

  // Update the navigation buttons
  function updateButtons() {
    prevButton.disabled = currentQuestion === 1;
    
    if (currentQuestion === totalQuestions) {
      nextButton.textContent = 'Submit';
      nextButton.classList.remove('next');
      nextButton.classList.add('submit');
    } else {
      nextButton.textContent = 'Next';
      nextButton.classList.remove('submit');
      nextButton.classList.add('next');
    }
    
    // Check if current question has an answer
    const currentQuestionRadios = document.querySelectorAll(`input[name="q${currentQuestion}"]:checked`);
    nextButton.disabled = currentQuestionRadios.length === 0;
  }

  // Show a specific question
  function showQuestion(questionNum) {
    quizQuestions.forEach(question => {
      const qNum = parseInt(question.getAttribute('data-question'));
      if (qNum === questionNum) {
        question.style.display = 'block';
      } else {
        question.style.display = 'none';
      }
    });
    
    // If we have a saved answer for this question, select it
    if (answers[`q${questionNum}`]) {
      const savedValue = answers[`q${questionNum}`];
      const radio = document.querySelector(`input[name="q${questionNum}"][value="${savedValue}"]`);
      if (radio) {
        radio.checked = true;
        radio.closest('.question-option').classList.add('selected');
      }
    }
  }

  // Update progress indicators
  function updateProgress() {
    const percent = Math.round((currentQuestion / totalQuestions) * 100);
    progressFill.style.width = `${percent}%`;
    questionNumber.textContent = `Question ${currentQuestion}/${totalQuestions}`;
    questionPercentage.textContent = `${percent}%`;
  }

  // Calculate the quiz score
  function calculateScore() {
    let score = 0;
    for (const key in answers) {
      score += parseInt(answers[key]) || 0;
    }
    return score;
  }

  // Get readiness level based on score
  function getReadinessLevel(score) {
    for (const level in readinessLevels) {
      const range = readinessLevels[level].range;
      if (score >= range[0] && score <= range[1]) {
        return level;
      }
    }
    // Default to expert for high scores
    return 'expert';
  }

  // Show quiz results
  function showResults() {
    const score = calculateScore();
    const level = getReadinessLevel(score);
    const levelData = readinessLevels[level];
    
    scoreValue.textContent = score;
    resultLevel.textContent = levelData.title;
    
    // Set result description
    resultDescription.innerHTML = `
      <p>${levelData.description}</p>
      <p><strong>What to expect:</strong> ${levelData.expectations}</p>
      <p><strong>Student impact:</strong> ${levelData.impact}</p>
    `;
    
    // Set next steps
    resultNextSteps.innerHTML = '';
    levelData.steps.forEach(step => {
      const li = document.createElement('li');
      li.textContent = step;
      resultNextSteps.appendChild(li);
    });
    
    // Hide questions, show results
    questionsContainer.style.display = 'none';
    quizResult.classList.add('show');
    document.querySelector('.quiz-nav').style.display = 'none';
  }

  // Event listeners for radio buttons and the entire option div
  document.querySelectorAll('.question-option').forEach(option => {
    const radio = option.querySelector('.option-input');
    
    // Allow clicking the entire option div to select the radio
    option.addEventListener('click', function() {
      // Select the radio button
      if (radio) {
        radio.checked = true;
        
        // Remove selected class from all options in this question
        const questionOptions = this.closest('.question-options').querySelectorAll('.question-option');
        questionOptions.forEach(opt => opt.classList.remove('selected'));
        
        // Add selected class to this option
        this.classList.add('selected');
        
        // Save the answer
        answers[radio.name] = radio.value;
        
        // Enable next button
        nextButton.disabled = false;
      }
    });
    
    // Also keep the original radio change event
    if (radio) {
      radio.addEventListener('change', function() {
        // Remove selected class from all options in this question
        const questionOptions = this.closest('.question-options').querySelectorAll('.question-option');
        questionOptions.forEach(option => option.classList.remove('selected'));
        
        // Add selected class to this option
        this.closest('.question-option').classList.add('selected');
        
        // Save the answer
        answers[this.name] = this.value;
        
        // Enable next button
        nextButton.disabled = false;
      });
    }
  });

  // Previous button click
  prevButton.addEventListener('click', () => {
    if (currentQuestion > 1) {
      currentQuestion--;
      showQuestion(currentQuestion);
      updateButtons();
      updateProgress();
    }
  });

  // Next button click
  nextButton.addEventListener('click', () => {
    if (currentQuestion < totalQuestions) {
      currentQuestion++;
      showQuestion(currentQuestion);
      updateButtons();
      updateProgress();
    } else {
      showResults();
    }
  });

  // Retake quiz button
  retakeButton.addEventListener('click', () => {
    initQuiz();
    document.querySelector('.quiz-nav').style.display = 'flex';
  });

  // Initialize quiz on page load
  initQuiz();
});