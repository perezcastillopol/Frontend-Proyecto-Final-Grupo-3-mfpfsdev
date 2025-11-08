import { Component, computed, effect, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-view',
  standalone: true,
  template: `
    <h2>Perfil de {{ username() }}</h2>
    <p>Bio de demo. Aquí irán intereses, valoraciones, etc.</p>
    @if (isMe()) {
      <button>Editar perfil</button>
    }
  `
})
export class UserViewComponent {
  private route = inject(ActivatedRoute);
  username = signal('usuario');
  isMe = computed(() => (localStorage.getItem('username') || '') === this.username());

  constructor() {
    effect(() => {
      const u = this.route.snapshot.paramMap.get('username');
      this.username.set(u ?? 'usuario');
    });
  }
}