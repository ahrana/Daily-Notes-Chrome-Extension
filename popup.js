document.addEventListener('DOMContentLoaded', function() {
  const splashScreen = document.getElementById('splash-screen');
  const noteForm = document.getElementById('note-form');
  const noteInput = document.getElementById('note-input');
  const saveNoteButton = document.getElementById('save-note');
  const formattedNote = document.getElementById('formatted-note');

  // Show splash screen for 2 seconds, then show note form
  setTimeout(() => {
    splashScreen.style.display = 'none';
    noteForm.style.display = 'block';
  }, 2000);

  // Save note to desktop
  saveNoteButton.addEventListener('click', () => {
    const note = noteInput.value;
    if (note.trim()) {
      saveNoteToFile(note);
      noteInput.value = '';
    }
  });

  function saveNoteToFile(note) {
    const blob = new Blob([note], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'daily_note.txt';
    a.click();
    URL.revokeObjectURL(url);
  }

  // Format note input
  noteInput.addEventListener('input', () => {
    const lines = noteInput.value.split('\n');
    formattedNote.innerHTML = '';
    lines.forEach((line, index) => {
      const coloredLine = document.createElement('div');
      coloredLine.innerHTML = `${index + 1}. ${formatText(line)}`;
      coloredLine.style.color = getColor(index);
      formattedNote.appendChild(coloredLine);
    });
  });

  function getColor(index) {
    const colors = ['red', 'green', 'blue', 'orange', 'purple'];
    return colors[index % colors.length];
  }

  function formatText(text) {
    const codeRegex = /`([^`]+)`/g;
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    
    text = text.replace(codeRegex, '<span class="code">$1</span>');
    text = text.replace(urlRegex, '<span class="website">$1</span>');
    
    return text;
  }
});
