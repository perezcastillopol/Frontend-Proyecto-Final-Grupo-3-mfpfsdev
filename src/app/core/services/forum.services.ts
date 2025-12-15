import {Injectable} from '@angular/core';
import {IMessage} from '../../interfaces/message.interface';
import {HttpServices} from './http.services';


@Injectable({
  providedIn: 'root'
})

  export class Forum extends HttpServices {
  
      private url = '/messages';
  
    getAllMsgByTrip(id:number): Promise<IMessage[]> {
      return this.get(`${this.url}/${id}`);
    }
  
    addMessage(message: IMessage): Promise<IMessage> {
      return this.post(`${this.url}`, message);
    }
  }

