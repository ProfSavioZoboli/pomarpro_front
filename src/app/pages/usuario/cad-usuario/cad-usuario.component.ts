import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from '../../../services/usuario.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-cad-usuario',
  templateUrl: './cad-usuario.component.html',
  styleUrl: './cad-usuario.component.scss',
})
export class CadUsuarioComponent {
  constructor(
    private usuarioService: UsuarioService,
    private snackbar: MatSnackBar
  ) {
    this.buscaUsuarios()
  }

  //Inicializa o formulário
  formulario: FormGroup = new FormGroup({
    id: new FormControl(null),
    nome: new FormControl('', Validators.required),
    sobrenome: new FormControl('', Validators.required),
    endereco: new FormControl('', Validators.required),
    telefone: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    login: new FormControl('', Validators.required),
  });

  //Métodos dos controles do formulário
  onIncluir() {
    this.formulario.reset();
    this.formulario.enable();
  }

  onSalvar() {
    //Guarda as informações em uma variável pra melhorar o acesso
    let info = this.formulario.value;
    //Verifica se está inserindo ou alterando com base no valor
    //do ID (se for null, está inserindo, senão está alterando)
    if (info.id == null) {
      //Irá inserir no banco de dados um usuário
      this.usuarioService.addUsuario(info).subscribe({
        next: (resposta) => {
          console.log(resposta);
          this.snackbar.open('Usuário adicionado com sucesso!', 'OK', {
            verticalPosition: 'top',
            horizontalPosition: 'end',
            duration: 3000,
          });
          this.onCancelar();
        },
        error: (erro) => {
          console.log(erro);
          this.snackbar.open('Oh não, aconteceu algo de errado!', 'OK', {
            verticalPosition: 'top',
            horizontalPosition: 'end',
            duration: 3000,
          });
        },
      });
    } else {
      //Irá alterar o usuário no banco de dados
    }
  }

  onCancelar() {
    this.formulario.reset();
    this.formulario.disable();
  }

  // Função para buscar as informações e usuários

  relatorio:any[] = [];

  buscaUsuarios(){
    this.usuarioService.getUsuarios().subscribe({
      next:(resposta)=>{
        console.log(resposta);
        this.relatorio = resposta.body;
      },
      error:(erro)=>{
        console.log(erro);
      }
    })
  }

}
