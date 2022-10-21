import { Component, EventEmitter, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
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

  onAddPost(form: NgForm) {
    if (form.invalid) {
      return;
    }
    const posts: Post = {
      title: form.value.Title,
      content: form.value.Content,
    };
    this.postCreated.emit(posts);
  }
}
