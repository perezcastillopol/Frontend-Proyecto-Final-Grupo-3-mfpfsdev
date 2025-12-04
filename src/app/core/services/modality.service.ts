import {Injectable} from '@angular/core';
import {IModality} from '../../interfaces/modality.interface';
import {HttpServices} from './http.services';


@Injectable({
  providedIn: 'root'
})
export class ModalityService extends HttpServices {

    private url = '/modality';

  getAllModalities(): Promise<IModality[]> {
    return this.get(`${this.url}`);
  }
}