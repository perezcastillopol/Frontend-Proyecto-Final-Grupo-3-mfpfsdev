import { Component, Input, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule, DatePipe } from '@angular/common';
import { Forum } from '../../core/services/forum.services';
import { IMessage } from '../../interfaces/message.interface';
import {AuthService} from '../../core/services/auth.service';

@Component({
  selector: 'app-forum',
  imports: [FormsModule, CommonModule, DatePipe],
  templateUrl: './forum.component.html',
  styleUrl: './forum.component.css',
})
export class ForumComponent implements OnInit {
  @Input() tripId!: number;
  
  private srv = inject(Forum);
  private authService = inject(AuthService);
  
  newTopicContent: string = '';
  showNewTopicForm: boolean = false;
  
  topics: IMessage[] = [];

  async ngOnInit() {
    if (this.tripId) {
      try {
        const messages = await this.srv.getAllMsgByTrip(this.tripId);
        this.loadMessagesIntoTopics(messages);
      } catch (error) {
        console.error('Error cargando mensajes del foro:', error);
      }
    }
  }

  private loadMessagesIntoTopics(messages: IMessage[]) {
    const parentMessages = messages.filter(m => m.parent_message_id === null);
    const replies = messages.filter(m => m.parent_message_id !== null);

    this.topics = parentMessages.map(msg => ({
      ...msg,
      replies: replies.filter(r => r.parent_message_id === msg.id),
      replyText: ''
    }));
  }

  toggleNewTopicForm() {
    this.showNewTopicForm = !this.showNewTopicForm;
    if (!this.showNewTopicForm) {
      this.newTopicContent = '';
    }
  }

  async createMessage() {
    if (this.newTopicContent.trim()) {
      const newMessage: IMessage = {
        id: 0,
        trip_id: this.tripId,
        user_id: Number(this.authService.getUserId()),
        content: this.newTopicContent,
        created_at: new Date().toISOString(),
        parent_message_id: null      
      };

      const response = await this.srv.addMessage(newMessage);
      newMessage.user_nickname = response.user_nickname;     
      this.topics.unshift(newMessage);
      this.newTopicContent = '';
      this.showNewTopicForm = false;
    }
  }

  async addReply(topic: IMessage) {
    if (topic.replyText && topic.replyText.trim()) {
      const newReply: IMessage = {
        id: 0,
        trip_id: this.tripId,
        user_id: Number(this.authService.getUserId()),
        content: topic.replyText,
        created_at: new Date().toISOString(),
        parent_message_id: topic.id
      };

      const response = await this.srv.addMessage(newReply);
      newReply.user_nickname = response.user_nickname;
      
      if (!topic.replies) topic.replies = [];
      topic.replies.push(newReply);
      topic.replyText = '';
    }
  }
}
