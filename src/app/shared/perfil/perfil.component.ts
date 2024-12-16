import { Component, Input, OnInit } from '@angular/core';
import { UserService } from '../services/user/user.service';

@Component({
  selector: 'tgt-perfil',
  standalone: true,
  imports: [],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.scss',
})
export class PerfilComponent implements OnInit {
  iniciais: string = '';
  @Input() nome: string = '';
  @Input() size: 'middle' | 'small' = 'middle';
  @Input() border: 'true' | 'none' = 'true';
  @Input() icon: boolean = false;

  constructor(private readonly userService: UserService) {}

  ngOnInit(): void {

    console.log(this.userService.user)

    if(this.userService.usuarioInstance) {

      this.iniciais = this.userService.usuarioInstance.firstName.charAt(0).toUpperCase();
      this.iniciais += this.userService.usuarioInstance.lastName.charAt(0).toUpperCase();

    }
  }

}
