import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-find-replace-2',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './find-replace-2.component.html',
  styleUrl: './find-replace-2.component.scss'
})
export class FindReplace2Component {
  text: string = '';
  find: string = '';
  replace: string = '';
  caseSensitive: boolean = false;
  highlightedText: any;
  matches: RegExpMatchArray | null = null;
  currentMatchIndex: any = -1;
  undoStack: string[] = [];
  redoStack: string[] = [];
  message: any;

  constructor() {
    this.updateHighlight();
  }

  // Highlight matches
  updateHighlight() {
    const findRegex = this.getRegex();
    console.log("findRegex", findRegex)
    this.matches = this.text.match(findRegex);
    this.highlightedText = this.text.replace(
      findRegex,
      (match, ...args) => `<mark class="highlight">${match}</mark>`
    );
  }

  // Navigate to the next match
  nextMatch() {
    debugger
    if (!this.matches || this.matches.length === 0) return;
   // Remove 'current' class from the previous match 
    const highlights = document.querySelectorAll('.highlight');
    if (this.currentMatchIndex >= 0) {
        highlights[this.currentMatchIndex].classList.remove('current');
    }
  // Move to the next match
    this.currentMatchIndex = (this.currentMatchIndex + 1) % this.matches.length;
   // Add 'current' class to the new match
    highlights[this.currentMatchIndex].classList.add('current');
    highlights[this.currentMatchIndex].scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

  // Navigate to the previous match
  previousMatch() {
    if (!this.matches || this.matches.length === 0) return;
    this.currentMatchIndex =
      (this.currentMatchIndex - 1 + this.matches.length) % this.matches.length;
    this.scrollToMatch();
  }

  // Replace the current match
  replaceOne() {
     if (this.text.toLowerCase().includes(this.find.toLowerCase()) && !this.caseSensitive && this.text.includes(this.find))
      this.message = '';

    if (!(this.text.includes(this.find)) && this.caseSensitive || this.matches == null) {
      const toaster: any = document.getElementById('toaster');
      toaster.innerHTML = 'No Matching Text or Phrase Found!'
      toaster.classList.add('show');
      setTimeout(() => {
        toaster.classList.remove('show');
      }, 3000);
      return
    }
    const findRegex = this.getRegex();
    this.saveUndo();
    this.text = this.text.replace(findRegex, this.replace);
    this.updateHighlight();

  }

  // Replace all matches
  replaceAll() {
    if (this.text.toLowerCase().includes(this.find.toLowerCase()) && !this.caseSensitive && this.text.includes(this.find))
      this.message = '';

    if (!(this.text.includes(this.find)) && this.caseSensitive || this.matches == null) {
      const toaster: any = document.getElementById('toaster');
      toaster.innerHTML = 'No Matching Text or Phrase Found!'
      toaster.classList.add('show');
      setTimeout(() => {
        toaster.classList.remove('show');
      }, 3000);
      return
    }
    const findRegex = this.getRegex('g');
    this.saveUndo();
    this.text = this.text.replace(findRegex, this.replace);
    this.updateHighlight();
  }

  // Undo the last action
  undo() {
    if (this.undoStack.length > 0) {
      this.redoStack.push(this.text);
      this.text = this.undoStack.pop() || '';
      this.updateHighlight();
    }
  }

  // Redo the last undone action
  redo() {
    if (this.redoStack.length > 0) {
      this.undoStack.push(this.text);
      this.text = this.redoStack.pop() || '';
      this.updateHighlight();
    }
  }

  // Save the current state to undo stack
  saveUndo() {
    this.undoStack.push(this.text);
  }

  // Generate regex based on options
  private getRegex(flags: string = ''): RegExp {
    let pattern = this.find;
    return new RegExp(pattern, `${this.caseSensitive ? '' : 'i'}${flags}`);
  }

  private scrollToMatch() {
    const highlights: any = document.querySelectorAll('.highlight');
    highlights.forEach((el: any, index: any) => {
      el.style.border = '';
    });

    if (highlights[this.currentMatchIndex]) {
      highlights[this.currentMatchIndex].style.border = '2px solid red';
      highlights[this.currentMatchIndex].scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }
  findMatches() {
    const regex: any = new RegExp(this.find, 'gi');
   // Clear previous highlights
    this.highlightedText = this.text.replace(/<mark class="highlight current">|<mark class="highlight">|<\/mark>/g, '');

    // Find all matches
    let serachMatches = [];
    if (this.find) {
      this.highlightedText = this.text.replace(regex, (match: any) => {
        serachMatches.push(match);
        return `<mark class="highlight">${match}</mark>`;
      });
    }

    // Reset index and navigate to the first match
    this.currentMatchIndex = -1;
    if (serachMatches.length > 0) {
      this.nextMatch();
    } else {
      const toaster: any = document.getElementById('toaster');
      toaster.innerHTML = 'No matches found!!'
      toaster.classList.add('show');
      setTimeout(() => {
        toaster.classList.remove('show');
      }, 3000);
    }
  }

  clearText() {
    this.text = '';
    this.find = '';
    this.replace = '';
    this.highlightedText = '';
    this.caseSensitive = false;
  }

}

