import { Injectable } from '@angular/core';
import { HttpServices } from './http.services';
import {TripParticipant} from '../../interfaces/trip-participant.interface';

@Injectable({ providedIn: 'root' })
export class ParticipantsService extends HttpServices {


  private url = '/participants';

    /**
     * Lista participantes aceptados del viaje
     */
    async getParticipants(tripId: number): Promise<TripParticipant[]> {
        return this.get(`${this.url}/trip/${tripId}/`);
    }

      isParticipants(idTrip: number, idUser: number): Promise<{is_participant: boolean}> {
    return this.get(`${this.url}/${idTrip}/${idUser}`);
  }


}
