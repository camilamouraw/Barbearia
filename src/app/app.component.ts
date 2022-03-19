import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Form, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';

interface Cliente{
  id: number,
  servico: number,
  cliente: string,
  contato: string
}

enum Servico{
  'Cabelo',
  'Barba',
  'Combo'
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'barbearia';
  logado: boolean = false;
  form: FormGroup;
  url: string = 'http://lucasreno.kinghost.net/barbearia';
  fila: Cliente[] = [];
  servicos: typeof Servico = Servico;

  constructor(
     public fb: FormBuilder,
     public http: HttpClient,
     private snackbar: MatSnackBar,
     ){

    this.form = this.fb.group({
      data: [new Date().toLocaleDateString()],
      cliente: ['', Validators.required],
      contato: ['', Validators.required],
      servico: ['', Validators.required],
    });
    this.pegarDados();
  }

  ngOnInt(){
    setInterval(
      () => {
        this.pegarDados();
      }
      ,1000
    )
  }

  verificarSenha(event: any){
    this.logado = event.target.value == '123';
  }

  enviarDados(){
    console.log(this.form.value);
    this.http.post<any>(this.url, this.form.value).subscribe(
      (data: any) => {
        this.snackbar.open(data, '', {
          horizontalPosition: 'right',
          verticalPosition: 'top',
          duration: 3000,
          panelClass: ['green-snackbar'],
        });

        this.pegarDados();
        this.form.reset();
      },
      (error: any) => {
        this.snackbar.open(error.error, '', {
          horizontalPosition: 'right',
          verticalPosition: 'top',
          duration: 3000,
          panelClass: ['red-snackbar'],
        });
      }
    );
  }

  pegarDados(){
    console.log("Solicitando dados ao backend");
    this.http.get<Cliente[]>(this.url).subscribe(
      (resposta: Cliente[]) => {
        this.fila = resposta;
      }
    );
  }

  removerDaFila(id:number){
    this.http.patch<any>(this.url, {id}).subscribe(
      (resposta: any) => {
        this.pegarDados();
      }
    );
  }
}
