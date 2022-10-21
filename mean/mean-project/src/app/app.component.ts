import { Component } from '@angular/core';
import { Post } from './interfaces/post.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'mean-project';
  storedPosts: Post[] = [];

  onPostAdded(post: any) {
    this.storedPosts?.push(post);
    console.log('storedPosts:', this.storedPosts);
  }
}
