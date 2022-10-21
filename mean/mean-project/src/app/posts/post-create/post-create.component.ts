import { Component, EventEmitter, Output } from '@angular/core';
import { Post } from 'src/app/interfaces/post.interface';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css'],
})
export class PostCreateComponent {
  enteredTitle = '';
  enteredContent = '';
  @Output() postCreated = new EventEmitter();

  onAppPost() {
    const posts: Post = {
      title: this.enteredTitle,
      content: this.enteredContent,
    };
    this.postCreated.emit(posts);
  }
}
